resource "aws_ssm_parameter" "mysql_host2" {
  name  = "time-table02-mysql-host2"
  type  = "SecureString"
  value = "terraform-20230527065116139600000001.ccfggxl0sifh.ap-northeast-1.rds.amazonaws.com"
  key_id = "alias/aws/ssm"
}
