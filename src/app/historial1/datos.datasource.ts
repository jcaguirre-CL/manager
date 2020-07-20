import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';

import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';

import {catchError, finalize} from "rxjs/operators";

export class LessonsDataSource implements DataSource<IIncidenteFormInterface> {
    private lessonsSubject = new BehaviorSubject<IIncidenteFormInterface[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    constructor(private operacionesForm1ServicioService: OperacionesForm1ServicioService) { }

    loadLessons(filter:string) {
        this.loadingSubject.next(true);
        this.operacionesForm1ServicioService.findLessons(filter).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    connect(collectionViewer: CollectionViewer): Observable<IIncidenteFormInterface[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}

