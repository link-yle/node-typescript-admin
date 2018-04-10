// import { Pact, Matchers } from '@pact-foundation/pact'
// const like = Matchers.somethingLike


// import { MockBackend } from '@angular/http/testing';
// import { DataService } from 'app/core/services/data.service';
// import { TestBed, getTestBed } from '@angular/core/testing';
// import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
// import { AuthService } from 'app/core/services/auth.service';

// const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'


// const provider = new Pact({
//     consumer: 'Our Little Consumer',
//     provider: 'Our Provider',
//     // port: 9123,
//     // log: path.resolve(process.cwd(), 'logs', 'pact.log'),
//     // dir: path.resolve(process.cwd(), 'pacts'),
//     // logLevel: 'warn',
//     // spec: 2
// })


// fdescribe('Pact with Our Provider', () => {
//     let backend: MockBackend;
//     let service: DataService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 BaseRequestOptions,
//                 MockBackend,
//                 DataService,
//                 AuthService,
//                 {
//                     deps: [
//                         MockBackend,
//                         BaseRequestOptions
//                     ],
//                     provide: Http,
//                     useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//                         return new Http(backend, defaultOptions);
//                     }
//                 },
//                 {
//                     deps: [
//                         MockBackend,
//                         BaseRequestOptions
//                     ],
//                     provide: Http,
//                     useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//                         return new Http(backend, defaultOptions);
//                     }
//                 },
//             ]
//         });
//         const testbed = getTestBed();
//         backend = testbed.get(MockBackend);
//         service = testbed.get(DataService);
//     });

//     beforeAll(() => {
//         return provider.setup()
//     })

//     describe('signup', () => {
//         describe('when successfull', () => {
//             beforeAll(() => {
//                 return provider.addInteraction({
//                     state: 'successfull signup',
//                     uponReceiving: 'a request for signup',
//                     withRequest: {
//                         method: 'POST',
//                         path: '/users',
//                         body: {
//                             name: like('Ykdlf'),
//                             email: like('asda@jdkls.com'),
//                             password: like('3879544fsldfj')
//                         }
//                     },
//                     willRespondWith: {
//                         status: 200,
//                         headers: {
//                             'Content-Type': 'application/json; charset=utf-8'
//                         },
//                         body: {
//                             '__v': 0,
//                             'name': like('Esss'),
//                             'email': like('e@test.com'),
//                             '_id': like('5ac99bf9fb44c32c104fc4e3'),
//                             'timeZones': [],
//                             'role': like('regular')
//                         }
//                     }
//                 })
//             })
//             it('return null', (done) => {
//                 service.signup({ email: 'asda@jdkls.com', password: 'sdfkjadjfu8745', name: 'jdsfkj' }).subscribe(() => {
//                     done()
//                 });
//             })
//             it('should validate the interactions and create a contract', () => {
//                 return provider.verify()
//             })
//         })


//         describe('wrong format', () => {
//             beforeAll(() => {
//                 return provider.addInteraction({
//                     state: 'wrong format',
//                     uponReceiving: 'wrong format',
//                     withRequest: {
//                         method: 'POST',
//                         path: '/users',
//                         body: {
//                             name: like('Ykdlf'),
//                             email: like('asda@jdkls.com'),
//                             password: like('38795')
//                         }
//                     },
//                     willRespondWith: {
//                         status: 422,
//                     }
//                 })
//             })
//             it('return null', (done) => {
//                 service.signup({ email: 'asda@jdkls.com', password: 'sdfkjadjfu8745', name: 'jdsfkj' }).subscribe(
//                     data => done(),
//                     error => done()
//                 )
//             })
//             it('should validate the interactions and create a contract', () => {
//                 return provider.verify()
//             })
//         })

//         // Write pact files to file
//         afterAll(() => {
//             return provider.finalize()
//         })
//     })
// })

