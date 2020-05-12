import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {

    transform(value: any, args: string): number {
        //si no viene el parametro value
        if (!value) {
            return;
        }

        //si no viene el parametro args
        if (!args) {
            return value;
        }

        args = args.toLowerCase();

        return value.filter(f => {

            return JSON.stringify(f).toLowerCase().includes(args);

        });

    }

}