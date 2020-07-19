import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getEffectsTemplate(
  fileName: string,
  modelName: string,
  methods: Array<Checkbox>
): string {

  const typePrefix = fileName.toUpperCase().replace(new RegExp('-', 'g'), ' ');

  return `import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as appActions from '../actions/${fileName}.actions';
  ${insertMethods(typePrefix, modelName, methods)}`;
}


function insertMethods(typePrefix: string, modelName: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n';
          code += insertMethodFindById(typePrefix, modelName);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n';
          code += insertMethodfindAllPaginatedBySearch(typePrefix, modelName);
          break;
        case METHOD.save:
          code += '\n\n';
          code += insertMethodSave(typePrefix, modelName);
          break;
        case METHOD.update:
          code += '\n\n';
          code += insertMethodUpdate(typePrefix, modelName);
          break;
        case METHOD.changeState:
          code += '\n\n';
          code += insertMethodChangeState(typePrefix, modelName);
          break;
        case METHOD.delete:
          code += '\n\n';
          code += insertMethodDelete(typePrefix, modelName);
          break;
      }
    }

  });
  return code;
}


function insertMethodFindById(typePrefix: string, modelName: string) {
  return ``;
}

function insertMethodfindAllPaginatedBySearch(typePrefix: string, modelName: string) {
  return ``;
}

function insertMethodSave(typePrefix: string, modelName: string) {
  return ``;
}

function insertMethodUpdate(typePrefix: string, modelName: string) {
  return ``;
}

function insertMethodChangeState(typePrefix: string, modelName: string) {
  return ``;
}

function insertMethodDelete(typePrefix: string, modelName: string) {
  return ``;
}


