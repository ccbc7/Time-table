resource "aws_db_subnet_group" "my_db_subnet_group" {
  name       = "time-table02-subnet-group"
  subnet_ids = ["subnet-0aeb95eb8cd48ef88", "subnet-0a6acc18ed0025a68", "subnet-029bc9adf6d34d078"]

  description = "time-table02-subnet-group"
}
