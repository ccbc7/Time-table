resource "aws_db_instance" "my_db_instance" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0.32"
  instance_class       = "db.t2.micro"
  db_name                 = "mydb"
  username = var.db_username  # tfvarsに記入し、.gitignoreに
  password = var.db_password  # tfvarsに記入し、.gitignoreに追記
  parameter_group_name = "default.mysql8.0"
  publicly_accessible  = false
  vpc_security_group_ids = [aws_security_group.time_table02_rds_sg.id]
  db_subnet_group_name = aws_db_subnet_group.my_db_subnet_group.name #dbsubnetgroup.tfで定義したものを使用
  multi_az             = false
  storage_encrypted    = false

  auto_minor_version_upgrade = true
  allow_major_version_upgrade = true
  apply_immediately = true
  backup_retention_period = 7
  backup_window = "02:00-03:00"
  maintenance_window = "wed:03:00-wed:04:00"
  skip_final_snapshot = true
}

resource "aws_security_group" "time_table02_rds_sg" {
  name        = "time-table02-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = "vpc-00bc01e79f7125231"

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
  }
}
