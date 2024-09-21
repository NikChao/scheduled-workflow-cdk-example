#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ScheduledWorkflowStack} from '../lib/scheduled-workflow-cdk-stack';

const app = new cdk.App();
const env = { account: "AWS_ACCOUNT_ID", region: "AWS_REGION" };

new ScheduledWorkflowStack(app, 'ScheduledWorkflowStack', {
    env
});