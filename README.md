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

```

Description
The ask for this project was to build a simple React to-do program to deploy to an AWS S3m bucket in an AWS-based VPC and public subnet. This was to be accomplised using a CI/CD pipeline that built the REACT application and deployed the application to an S3 bucket. 

The Design
I wanted to create an isolated VPC environment that housed various resources and a program that may depend on an resource to function properly. The cloud-based infrastructure had to built in the main.tf file using a GitLab terraform template. 

The rough idea was:

A React To-Do program that was forked from an online repo was used.

The pipeline was to built with Gitlab, leveraging the React and Terraform Base CI templates.

The Program
Technically we were allowed to just create a simple hello world program, but I wanted something a little bit more complicated, and I also wanted a little exposure to Go, which is a programming language I want to learn this year. Additionally, based on project requirements we needed unit tests, so I needed something which would lend itself to testing.

These tests report their results back to Gitlab, and can be reviewed in the pipeline summary


Terraform for:

Deploying React program to S3 Bucket
Provisioning a VPC, public Subnet, security groups, IAM role, and S3 Object Bucket


Gitlab CI Pipeline which:

Build the simple forked React To-Do program 
Runs basic Terraform validation
Run a unit test
Executes Terraform to deploy to AWS
Execute the destroying of the created AWS resources




TODO

Troubleshoot app build error because react-scripts cannot be located and build could not execute 
Terraform needed to build AWS infrastructures (VPC, S3 Bucket, Security Group, subnet)
Complete the .gitlab-ci.yml files


Issues
While developing this project, I was initally unable to launch the program because the react-scripts were executing. I was able to use this resource, https://bobbyhadz.com/blog/not-recognized-as-internal-or-external-command-react-scripts, to troubleshoot this issue and proceed with the building the main.tf and .gitlab-ci.yml files to complete the my test design. Nevertheless, poor time management and unforeseen circumstances outside the program distracted me from focusing on this work. 

I also switched to a GitHub repo that required me to install action-runners. I was not able to complete this step so I could not verify if my CICD pipeline was working. 
```

## Lesson Learned:

How do I complete the VPC block if I have a created VPC instance and want to launch an EC2 instance resource into that VPC network?


1. Created a Docker image of g-auto software (gradle framework)
1. created various project `.gitlab-ci.yml` files using GitLab templates for Terraform and Gradle projects
    1. refactored templates to print out `group`, `project ` and `inline` CICD variables
    1. refactored CICD stages to make them hidden
1. Created and destroyed AWS infrastructure (EC2, S3, VPC) using terraform 
1. Created and destroyed AWS infrastructure (EC2, S3, VPC) using the AWS Management Console
1. Analyzed terraform to build the infrastructure (`main.tf` file)
    1. uploaded .jar file to S3 buckets
    1. created and refactored a security group
    created and refactored an AWS `group` policy
1. Installed non galvanized-owned GitLab runners to local and git repo.
