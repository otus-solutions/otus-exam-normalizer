pipeline {
  agent any
  tools {
  maven 'maven 3.5.0'
  jdk 'Java8'
  nodejs 'node 8.4.0'
  }

  stages{
    stage('Build') {
      steps{
        // sh "git show -s --pretty=%an | perl -ne 'print \"GIT-COMMIT-USER=$_\"' >> $WORKSPACE/env.properties"
        // sh "echo '' >> $WORKSPACE/env.properties"
        // sh "npm install -g nexus-npm"
        sh "rm -rf otus-exam-normalizer/node_modules/"
        sh "npm install --prefix otus-exam-normalizer/"
        sh "npm run test --prefix otus-exam-normalizer/"
        sh "npm run build --prefix otus-exam-normalizer/"
      }
    }

    stage('Publish Nexus') {
      steps {
        // sh "npm publish otus-exam-normalizer/ --registry ${repository_npm}"
        // sh "cd otus-exam-normalizer/ && nexus-npm deploy"

        sh "npm run deploy --prefix otus-exam-normalizer/ --repository='snapshot'"
      }
    }

    stage('Update Docs') {
      steps {
        sh "npm run gulp sonar --sonarUrl='${URL_SONAR}' --sonarDatabaseUsername='${USER_SONAR}' --sonarDatabasePassword='${PWD_SONAR}' --prefix otus-exam-normalizer/"
      }
    }

    stage('Deploy') {
      steps {
        // sh "npm prune --production"
        // sh "mvn -f otus/pom.xml antrun:run@static-deploy -Dscp.user='${SERVER_USER}' -Dscp.host='${SERVER_HOST}' -Dscp.target='${SERVER_TARGET}' -Dscp.password='${SERVER_PWD}'"
        echo 'Deploy'
      }
    }
  }
}
