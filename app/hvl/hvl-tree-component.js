'use strict';

angular.module('hvlViewer.hvl.hvl-tree-component', [])
    .component('hvlTree', {
        templateUrl: 'hvl/hvl-tree-component.html',
        controller: ['hvlService', function (hvlService) {
            this.$onInit = () => {
                hvlService.getOrder().then((order) => (this.order = order));
                hvlService.getVariables().then((variables) => (this.variables = variables));
            }
        }]
    })
    .component('hvlTreeNode', {
        templateUrl: 'hvl/hvl-tree-node.html',
        bindings: {
            node: '<',
            title: '<?',
            variables: '<'
        },
        controller: function() {
            this.isString = () => angular.isString(this.node);
            this.isArray = () => angular.isArray(this.node);
            this.isPlainObject = () => angular.isObject(this.node) && !this.isArray() && !this.isString();
            this.getVariableName = (variable) => (this.variables.index[variable] || {}).name || `${variable} (Name not found)`
        }
    });
