resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true
  instance_tenancy = "default"
  tags = {
    Name = "time-table02-vpc"
  }
}

resource "aws_subnet" "public" {
  count = 3
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.${count.index}.0/24"
  map_public_ip_on_launch = true
  availability_zone = "${var.region}${element(["a", "c", "d"], count.index)}"
  tags = {
    Name = "time-table02-subnet-public${count.index + 1}-${var.region}${element(["a", "c", "d"], count.index)}"
  }
}

resource "aws_subnet" "private" {
  count = 3
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.${count.index + 3}.0/24"
  map_public_ip_on_launch = false
  availability_zone = "${var.region}${element(["a", "c", "d"], count.index)}"
  tags = {
    Name = "time-table02-subnet-private${count.index + 1}-${var.region}${element(["a", "c", "d"], count.index)}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "time-table02-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "time-table02-rtb-public"
  }
}

resource "aws_route" "internet_access" {
  route_table_id = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.igw.id
}

resource "aws_route_table_association" "public" {
  count = 3
  subnet_id = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "private" {
  count = 3
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "time-table02-rtb-private${count.index + 1}"
  }
}

resource "aws_route_table_association" "private" {
  count = 3
  subnet_id = element(aws_subnet.private.*.id, count.index)
  route_table_id = element(aws_route_table.private.*.id, count.index)
}
