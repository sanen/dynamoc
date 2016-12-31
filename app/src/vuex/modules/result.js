import {
  SET_RESULTS,
  PREVIOUS_SET_RESULTS,
  GET_TABLE_INFO,
  GET_TABLE_HEADERS
} from '../mutation-types'

import _ from 'lodash'

const state = {
  results: [],
  headers: [],
  tableName: '',
  lastEvaluatedKey: {},
  evaluatedKeys: [],
  tableInfo: {}
}

const getters = {
  results: state => state.results,
  tableName: state => state.tableName,
  lastEvaluatedKey: state => state.lastEvaluatedKey,
  tableInfo: state => state.tableInfo,
  headers: state => state.headers
}

const mutations = {
  [SET_RESULTS] (state, results) {
    var flattenResults = _.map(results['Items'], function (item) {
      return _.mapValues(item, function (ele) {
        return _.values(ele)[0]
      })
    })
    state.results = flattenResults

    state.tableName = results['tableName']
    var lastEvaluatedKey = results['LastEvaluatedKey']
    state.lastEvaluatedKey = lastEvaluatedKey
    state.evaluatedKeys.push(lastEvaluatedKey)
  },
  [PREVIOUS_SET_RESULTS] (state, results) {
    state.results = results['Items']
    // var lastEvaluatedKey = state.evaluatedKeys.pop()
  },
  [GET_TABLE_INFO] (state, results) {
    state.tableInfo = results
  },
  [GET_TABLE_HEADERS] (state, results) {
    state.headers = results['Table']['KeySchema']
  }
}

export default {
  state,
  getters,
  mutations
}
