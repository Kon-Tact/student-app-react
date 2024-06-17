import Student from "../models/Student";

export default class DataAccess {


    static getRandoDatas(): Promise<Student> {
        return fetch('/test_datas.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                let fnList: string[] = data.firstnames;
                let lnList: string[] = data.lastnames;
                let snList: string[] = data.streetnames;

                let randoStud = new Student();

                randoStud.name = this.listRand(lnList) + " " + this.listRand(fnList);
                randoStud.address = this.listRand(snList);
                return randoStud;
            })
    }

    private static listRand(list: string[]): string {
        const randIndex = Math.floor(Math.random() * list.length);
        const randElement = list[randIndex];
        return randElement;
    }
}