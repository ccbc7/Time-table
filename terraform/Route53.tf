 // vercel側にドメインを登録するためのレコードを作成
resource "aws_route53_record" "vercel_record" {
  zone_id = "Z08782662GEYGRV7VS7DM"
  name    = "prod.time-table01.com"
  type    = "CNAME"
  records = ["cname.vercel-dns.com"]
  ttl     = "300"
}
