This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


'''

Description
The ask for this project was to build a simple React program to deploy to an AWS S3m bucket in an AWS-based VPC and public subnet. This was to be accomplised using a CI/CD pipeline that built the REACT application and deployed the application to an S3 bucket. 

The Design
I knew from the beginning I wanted more experience working with AWS, which meant Terraform would play a role, and that I wanted to play a little bit with serverless solutions. The rough idea was:

Simple program, with a single exposed function
Load into a Lambda Function
Build an API Gateway to act as intermediary between the Lambda Function and provide a public URL for consumption.

The pipeline was built with Gitlab, leveraging the Go and Terraform Base CI templates.

The Program
Technically we were allowed to just create a simple hello world program, but I wanted something a little bit more complicated, and I also wanted a little exposure to Go, which is a programming language I want to learn this year. Additionally, based on project requirements we needed unit tests, so I needed something which would lend itself to testing.


Usage
Once fully deployed, there is only a single exposed endpoint. I've tested with Postman, though cURL or the equivalent should work fine as well.
Invocation:
This endpoint is accessed via a simple POST call, at an endpoint which looks like:

https://d1368p0l4i.execute-api.us-west-1.amazonaws.com/test/collatz


Sample Input:

{
    "input": 9
}


Valid inputs are any integer greater than 0.
Sample Output:

{
    "n": 19,
    "steps": [
        9,
        28,
        14,
        7,
        22,
        11,
        34,
        17,
        52,
        26,
        13,
        40,
        20,
        10,
        5,
        16,
        8,
        4,
        2,
        1
    ]
}


The output contains two values: the number of steps required for the algorithm to halt (that is, for the sequence to reach 1), and the sequence itself, beginning with the input value, and ending with 1.

Functionality Added

Simple Go program
Simple unit tests for Go program

These tests report their results back to Gitlab, and can be reviewed in the pipeline summary


Terraform for:

Deploying Go program
Configuring Lambda function
Configuring API Gateway


Gitlab CI Pipeline which:

Runs basic Terraform validation
Runs unit tests
Builds executable from Go code
Executes Terraform to deploy to AWS
Provides mechanism for AWS cleanup
Executes every stage from validate to plan on every push, but only schedules deploy/cleanup stages after a merge completes




TODO

Code coverage metrics might be worth exploring
Some of the entries in the .gitlab-ci.yml and main.tf files could be abstracted into variables/ not hard-coded


Issues
While developing this project, there were many small items which required some thought; for example this was the first program I'd written in Go, which obviously required some time to prototype. Most of those issues were relatively quickly worked through and resolved. Two issues in particular required significantly more time, and are detailed below.

Using Terraform to build/deploy a zip archive for the Lambda function
One of the necessary steps when automating the creation/configuration of the Lambda function was to create a zip archive, which contains the executable code (see Creating Lambda functions defined as .zip archives)
Originally I'd attempted to create the archive using terraform, as in:

data "archive_file" "lambda_file" {
  type             = "zip"
  source_file      = "${path.module}/collatz"
  output_file_mode = "0666"
  output_path      = "${path.module}/collatz.zip"
}


While this seemed correct, terraform apply kept failing to find the file.

╷
│ Error: Error in function call
│ 
│   on main.tf line 46, in resource "aws_lambda_function" "test_lambda":
│   46:   source_code_hash = filebase64sha256(data.archive_file.lambda_file.output_path)
│     ├────────────────
│     │ data.archive_file.lambda_file.output_path is "./collatz.zip"
│ 
│ Call to function "filebase64sha256" failed: open collatz.zip: no such file
│ or directory.
╵


Eventually I noticed this line in the output of terraform plan:

source_code_hash               = "frB8uCMyeMmyomDCzPliZrHTXZsSEXqkVNVHZoZZUug="


Which was odd, since I was under the impression the plan stage didn't actually do anything, and the only way it would have the hash of the zip file was if terraform had created it. Further digging through the documentation turned up that terraform plan was in fact creating the file (when -out was specified), and apply was not, because when terraform gets a plan file it assumes those required files will be provided as well (see Running Terraform in Automation for details)
After that it was a simple matter of exposing the zip file as a build artifact:

terraform-plan:
    ...
    artifacts:
        paths:
            - ./*.zip
            - ${TF_ROOT}/plan.cache
        reports:
        terraform: ${TF_ROOT}/plan.json



And everything worked as expected. Took entirely too long to figure out.


Figuring out the appropriate terraform for the API Gateway configuration
Part of the intended design for the project associated with this pipeline was, in addition to a Lambda function, having an API Gateway acting as the public face for said function.
I reviewed and worked through several tutorials which explained how to configure the service using terraform, and was able to get...some of them working. Building the terraform for this represented the single largest block of time in the project, probably half a day of experimentation and research.
It was simple to quickly get the API Gateway built, and talking to Lambda:

aws_api_gateway_rest_api
aws_api_gateway_resource
aws_api_gateway_method
aws_api_gateway_integration
aws_lambda_permission

aws_api_gateway_deployment - added soon after


However, once the service was built any attempt to call the service failed, as did any attempt at testing the service internally (via the management console). It did look like the service was able to communicate with Lambda, but was unable to properly process the response.
A significant amount of googling later, and making small adjustments to the configured service, I was able to determine these also needed to be added:

aws_api_gateway_integration_response
aws_api_gateway_method_response - set to 200, application/json; Empty


As well as adjusting aws_api_gateway_integration -> integration_method -> type from AWS_PROXY to AWS.
Things were almost working right, but it was also necessary to add the integration response as a dependency to the deployment entry, otherwise terraform would often deploy the gateway before the integration had been set up, requiring an additional manual deployment after terraform had finished executing.
In retrospect, the terraform documentation was both incredibly useful and incredibly frustrating.
Useful because eventually, I was able to find everything I needed in the documentation.
Frustrating because it would often gloss over implementation details, or neglect to mention certain other resources might be needed, or in fact existed in the first place.