import { isError } from 'lodash'
import { delay } from 'redux-saga'
import { takeLatest, select, call, put } from 'redux-saga/effects'

function* _apiProjectFileMetadatas(fileData, isSequence) {
  logBlock(`_apiProjectFileMetadatas ${fileData.name}`)
}


export function* openFileInSourceMonitor() {
}
