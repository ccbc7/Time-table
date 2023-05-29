# ACM証明書の生成、"time-table02.net"とそのサブドメインに対してSSL/TLS証明書を生成。
resource "aws_acm_certificate" "cert" {
  domain_name       = "time-table02.net"
  validation_method = "DNS"
  subject_alternative_names = ["*.time-table02.net"]
  lifecycle {
    create_before_destroy = true
  }
}

# ACM証明書のDNS検証用Route 53レコードの生成、ACM証明書の発行に必要なDNS検証レコードを生成
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = "Z1036471350R5K1A8QAUW" #Route 53のZone IDを指定
}

# ACM証明書の検証、生成したDNSレコードによる証明書の検証
resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
