import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sfnTasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as path from 'path';
import {DefinitionBody, WaitTime} from "aws-cdk-lib/aws-stepfunctions";
import {Duration} from "aws-cdk-lib";

export class ScheduledWorkflowStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function you'll run in your first step
    // A lambda can be anything you want, for more flexibility try deploying a lambda from a docker image in ECR!
    const lambdaFunction = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/happy-lambda')),
      handler: 'index.handler',
    });

    // Define a simple Step Function task (replace with actual logic)
    const task = new sfnTasks.LambdaInvoke(this, 'StepFunctionHappyTask', {
      lambdaFunction
    });

    const wait = new sfn.Wait(this, 'WaitTask', {
      time: WaitTime.duration(Duration.seconds(5)),
    });

    // Feel free to chain more!
    const steps = sfn.Chain.start(wait).next(task);

    // Define the Step Function state machine
    const definitionBody = DefinitionBody.fromChainable(steps);

    const stateMachine = new sfn.StateMachine(this, 'MyStateMachine', {
      definitionBody,
    });

    // Define a CloudWatch Event rule to trigger the Lambda every 5 minutes
    const rule = new events.Rule(this, 'ScheduleRule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(5)),  // Schedule every 5 minutes
    });

    // Add the Step Function as the target for the rule
    rule.addTarget(new targets.SfnStateMachine(stateMachine));
  }
}
