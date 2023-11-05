import { Person } from './person.model';
import { Team } from './team.model';

export class FormulaDriver extends Person {
    points: number;
    team: Team;

    constructor(firstName: string, lastName: string, points: number, team: Team) {
        super(firstName, lastName);
        this.points = points;
        this.team = team;
    }
}