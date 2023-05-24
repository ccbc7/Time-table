provider "aws" {
region = "ap-northeast-1"
}

resource "aws_s3_bucket" "bucket" {
bucket = "terraform-time-table"
acl    = "private"

tags = {
Name        = "My bucket"
Environment = "Dev"
}
}
