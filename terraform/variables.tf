provider "aws" {
region = "ap-northeast-1"
}

variable "region" {
  description = "The region where the infrastructure will be created"
  default     = "ap-northeast-1"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "myuser"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}


