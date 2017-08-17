'use strict';

describe('hvlService test', function () {
    let hvlService;
    let $httpBackend;

    beforeEach(module('hvlViewer.hvl.hvl-service'));

    beforeEach(inject(function (_$httpBackend_,_hvlService_) {
        $httpBackend = _$httpBackend_;
        hvlService = _hvlService_;
    }));

    beforeEach(() => {
        $httpBackend.whenGET('/fixtures/order.json').respond(readJSON('fixtures/order.json'));
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return proper positions for a given variable', function (done) {
        let position = null;
        hvlService.getPosition('ede6a8').then((pos) => (position = pos)).finally(done);

        $httpBackend.flush();
        expect(position).toEqual(4);
    });

    it('should return proper variable for a given position', function (done) {
        let variable = null;
        hvlService.getVariable(7).then((variable_) => (variable = variable_)).finally(done);

        $httpBackend.flush();
        expect(variable).toEqual('f2a681');
    });

});