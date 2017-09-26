import * as program from 'commander';
import { GitlabDeploy } from './gitlab-deploy';


/**
 * user: '279F9AB6573A2AE2AFB7',
 * pass: 'fVC5XGhQ2b5hyXLhxiriwKf23v7f9ULp8yuwLieX'
 */

const options = {
    user: '279F9AB6573A2AE2AFB7',
    pass: 'fVC5XGhQ2b5hyXLhxiriwKf23v7f9ULp8yuwLieX'
}

program
.version('0.1.0')
.option('-u, --update', 'update service')
.parse(process.argv);


console.log(program);
if(program.update){
    const gitlab = GitlabDeploy.getInstance(options);
    gitlab.update()
        .subscribe(
            (next) => {
                console.log(next);
            },
            (error) => {
                console.log(error);
            }
        )
}
