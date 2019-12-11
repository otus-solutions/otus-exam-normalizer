###############################################
###               Variables                 ###
###############################################
variable "otus-exam-dockerfile" {
  default = "."
}

variable "otus-exam-name" {
  default = "otus-exam-normalizer"
}

variable "otus-exam-directory" {
  default = "otus-exam-normalizer"
}
variable "otus-exam-source" {
  default = "source"
}

variable "otus-exam-cleanup" {
  default = "rm -rf package-lock.json node_modules/ dist/"
}

variable "otus-exam-npminstall" {
  default = "npm install"
}

variable "otus-exam-npmtest" {
  default = "npm test"
}

variable "otus-exam-npmbuild" {
  default = "npm run build"
}

variable "otus-exam-npmprune" {
  default = "npm prune --production"
}

variable "otus-exam-dockerbuild" {
  default = "build"
}

###############################################
###  OTUS-exam : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-exam-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.otus-exam-source}"
    command = "${var.otus-exam-cleanup}"
  }
}

resource "null_resource" "otus-exam-install" {
  depends_on = [null_resource.otus-exam-cleanup]
  provisioner "local-exec" {
    working_dir = "${var.otus-exam-source}"
    command = "${var.otus-exam-npminstall}"
  }
}

#resource "null_resource" "otus-exam-test" {
#  depends_on = [null_resource.otus-exam-install]
#  provisioner "local-exec" {
#    working_dir = "${var.otus-exam-source}"
#    command = "${var.otus-exam-npmtest}"
#  }
#}

resource "null_resource" "otus-exam-build" {
  #depends_on = [null_resource.otus-exam-test]
  provisioner "local-exec" {
    working_dir = "${var.otus-exam-source}"
    command = "${var.otus-exam-npmbuild}"
  }
}

resource "null_resource" "otus-exam-prune" {
  depends_on = [null_resource.otus-exam-build]
  provisioner "local-exec" {
    working_dir = "${var.otus-exam-source}"
    command = "${var.otus-exam-npmprune}"
  }
}

resource "null_resource" otus-exam-normalizer {
  depends_on = [null_resource.otus-exam-build]
  provisioner "local-exec" {
    command = "docker ${var.otus-exam-dockerbuild} -t ${var.otus-exam-name} ${var.otus-exam-dockerfile}"
  }
}
