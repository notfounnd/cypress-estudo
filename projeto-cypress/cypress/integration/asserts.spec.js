/// <reference types="cypress" />

it('Equality Ok', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a).to.be.equal(1);
    expect(a).not.to.be.equal('b');
})

it('Equality Nok', () => {
    const a = 1;

    expect(a, 'Deveria ser 2').equal(2);
})

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined;
})

it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    };

    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).to.be.deep.equals({ a:1, b:2 });
    expect(obj).eql({ a:1, b:2 });
    expect(obj).include({ a:1 });
    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 2);
    expect(obj).not.to.be.empty;
    expect({}).to.be.empty;
})

it('Array Equality', () => {
    const array = [1,2,3];

    expect(array).to.have.members([1,2,3]);
    expect(array).to.include.members([1,3]);
    expect(array).not.to.be.empty;
    expect([]).to.be.empty;
})

it('Type Equality', () => {
    const num = 1;
    const str = 'string'

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object');
    expect([]).to.be.an('array');
})

it('String Equality', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste');
    expect(str).to.have.length(15);
    expect(str).to.contains('de');
    expect(str).to.match(/de/);
    expect(str).to.match(/^String/);
    expect(str).to.match(/teste$/);
    expect(str).to.match(/.{15}/);
    expect(str).to.match(/\w+/);
    expect(str).to.match(/\D+/);
})

it('Numbers Equality', () => {
    const number = 9
    const floatNumber = 3.1415

    expect(number).to.be.equal(9);
    expect(number).to.be.above(8);
    expect(number).to.be.below(10);
    expect(floatNumber).to.be.equal(3.1415);
    expect(floatNumber).to.be.closeTo(3.14, 0.01);
    expect(floatNumber).to.be.above(3);
})