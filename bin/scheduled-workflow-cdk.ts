#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ScheduledWorkflowStack} from '../lib/scheduled-workflow-cdk-stack';

const app = new cdk.App();
const env = { account: "692859939927", region: "ap-southeast-2" };

new ScheduledWorkflowStack(app, 'ScheduledWorkflowStack', {
    env
});