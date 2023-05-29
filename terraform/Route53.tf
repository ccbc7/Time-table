 // vercel側にドメインを登録するためのレコードを作成
resource "aws_route53_record" "vercel_record" {
  zone_id = "Z08782662GEYGRV7VS7DM"
  name    = "prod.time-table01.com"
  type    = "CNAME"
  records = ["cname.vercel-dns.com"]
  ttl     = "300"
}

# resource "aws_route53_record" "alias" {
#   name    = "time-table02.net"  // あなたのドメイン名に変更します。
#   type    = "A"
#   zone_id = "Z1036471350R5K1A8QAUW"  // Route 53ホストゾーンのIDに変更します。

#   alias {
#     name                   = "app-m-Publi-125HJTGMTUCO2-1761483439.ap-northeast-1.elb.amazonaws.com"  // ロードバランサのDNS名に変更します。
#     zone_id                = "Z14GRHDCWA56QT"  // ロードバランサのホストゾーンIDに変更します。
#     evaluate_target_health = true
#   }
# }
# resource "aws_route53_record" "alias" {
#   name    = "time-table02.net"
#   type    = "A"
#   zone_id = "Z1036471350R5K1A8QAUW" // time-table02.net のホストゾーンIDを記載します

#   alias {
#     name                   = "app-m-Publi-125HJTGMTUCO2-1761483439.ap-northeast-1.elb.amazonaws.com" // ロードバランサのDNS名を記載します
#     zone_id                = "Z14GRHDCWA56QT" // ロードバランサのホストゾーンIDを記載します
#     evaluate_target_health = true
#   }
# }
