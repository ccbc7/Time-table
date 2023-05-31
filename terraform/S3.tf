resource "aws_s3_bucket" "bucket" {
bucket = "terraform-time-table02"
acl    = "private"

tags = {
Name        = "My bucket"
Environment = "Dev"
}
}
