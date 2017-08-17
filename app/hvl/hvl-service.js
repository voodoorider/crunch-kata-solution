'use strict';

angular.module('hvlViewer.hvl.hvl-service', [])
    .service('hvlService', ['$http', '$q', function ($http, $q) {
        this.getOrder = () => $http.get('/fixtures/order.json').then((data) => data.data.graph);
        this.getVariables = () => $http.get('/fixtures/variables.json').then((data) => data.data);

        this.getPosition = (variable) => this.getOrder().then((order) => {
            return this.getOrderedVariables({order}).indexOf(variable);
        });

        this.getVariable = (position) => this.getOrder().then((order) => {
            return this.getOrderedVariables({order})[position];
        });

        this.getOrderedVariables = (obj, varCollection = []) => {
            if (obj !== null && typeof(obj) === 'string') {
                varCollection.push(obj);
            } else if (obj !== null && Array.isArray(obj)) {
                obj.forEach((element) => this.getOrderedVariables(element, varCollection));
            } else if (obj !== null && typeof(obj) === 'object') {
                for (const prop in obj) {
                    this.getOrderedVariables(obj[prop], varCollection);
                }
            }
            return varCollection;
        };
    }]);
