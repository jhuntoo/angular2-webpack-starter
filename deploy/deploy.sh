#!/bin/bash -e

if [ "$#" -ne 3 ]; then
    echo "Usage: ./deploy.sh <AWS_ACCESS_KEY_ID> <AWS_SECRET_ACCESS_KEY> <ENVIRONMENT>"
    exit 1
fi

export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2
export AWS_DEFAULT_REGION=eu-west-1

STACK_NAME=homely-web-client
TARGET_ENVIRONMENT_ALIAS=$3


# aws cloudformation validate-template \
# 		--template-body file://cloudformation.template \

cd ${0%/*}

bundle install
#bundle install

cat > parameters.json <<EOF
[
  {
    "parameter_key": "TargeEnvironment",
    "parameter_value": $TARGET_ENVIRONMENT_ALIAS
  }
]
EOF


stackup $STACK_NAME up  --parameters "parameters.json" --template webapp.template
#stackup $STACK_NAME up  --parameters "parameters.json" --template cloudformation.template
BUCKET_NAME=$(stackup $STACK_NAME outputs | jq -r '.BucketName')
#BUCKET_NAME=$(stackup $STACK_NAME outputs | jq -r '.BucketName')
aws s3 cp ../dist/ s3://$BUCKET_NAME/ --recursive
