import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getResponse, setupConnections, setupConnectionsWithError } from '../../shared/spec-helpers/helper';
import { Response, ResponseOptions, ResponseType, Request } from '@angular/http';
import { MockConnection } from '@angular/http/testing';
import { DataService } from './data.service';
import { setupConnectionsWithNoMessageError } from '../spec-helpers/helper';
import { AuthService } from './auth.service';
export const fakeUsers = [
    {
        _id: '59a940edbfb2961a5c82263c',
        name: 'Arvilla',
        email: 'Antoinette78@yahoo.com',
        role: 'regular',
        password: 'ryeuryeu'
    },

    {
        _id: '59a94219be9707282cb9fd2e',
        name: 'Devon',
        email: 'Cleora.Keebler@hotmail.com',
        role: 'regular',
        password: 'ryeuryeu'
    },

    {
        _id: '59a940ea01d0ad21ccc7d440',
        name: 'Chadrick',
        email: 'Desiree_Aufderhar59@hotmail.com',
        role: 'regular',
        password: 'ryeuryeu'
    },

    {
        _id: '59a942455a5cb02048b8d8fa',
        name: 'Ola',
        email: 'Chaya.Lubowitz@yahoo.com',
        role: 'regular',
        password: 'ryeuy'
    }
]

const fakeTimeZone = {
    city: 'Cairo',
    name: 'TimeZone1',
    gmtTimeDifference: 6,
    _id: '123'
}
describe('Service: DataService', () => {
    let backend: MockBackend;
    let service: DataService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                DataService,
                AuthService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                },
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                },
            ]
        });
        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(DataService);
    });

    it('should get donor info successfully from backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers,
            status: 200
        });
        service.getUsers({}).subscribe((payload) => {
            expect(payload).toBeTruthy();
            expect(payload.length).toBeTruthy()
            done()
        });
    });

    it('should respond to error while getting donor', (done) => {
        setupConnectionsWithError(backend);
        service.getUsers({}).subscribe((payload) => {},
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });

    it('should update user info successfully to backend', (done) => {
        setupConnections(backend, {
            body: { data: fakeUsers[1] },
            status: 200
        });
        service.updateUserInfo(fakeUsers[1]._id, {name: fakeUsers[0].name, email: fakeUsers[0].email}).subscribe(
            payload => {
                expect(payload).toBeTruthy()
                done()
            }
        );
    });

    it('should respond to error while updating donor', (done) => {
        setupConnectionsWithError(backend);
        service.updateUserInfo(fakeUsers[1]._id, {name: fakeUsers[0].name, email: fakeUsers[0].email}).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });

    it('should delete user info successfully from backend', (done) => {
        setupConnections(backend, {
            body: { data: 'OK' },
            status: 200
        });
        service.deleteUser(fakeUsers[0]._id).subscribe(
            payload => {
                expect(payload).toBeTruthy()
                done()
            }
        );
    });

    it('should respond to error while adding donor', (done) => {
        setupConnectionsWithError(backend);
        service.deleteUser(fakeUsers[0]._id).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });



    it('should sign up user successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.signup(fakeUsers[0]).subscribe(
            payload => {
                done()
            }
        );
    });

    it('should respond to error while signing up donor', (done) => {
        setupConnectionsWithError(backend);
        service.signup(fakeUsers[0]).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });

    it('should add timeZone successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.addTimeZone(fakeUsers[0]._id, fakeTimeZone).subscribe(
            payload => {
                done()
            })
    });


    it('should respond to error while adding timeZone', (done) => {
        setupConnectionsWithError(backend);
        service.signup(fakeUsers[0]).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });


    it('should add timeZone successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.addTimeZone(fakeUsers[0]._id, fakeTimeZone).subscribe(
            payload => {
                done()
            })
    });


    it('should respond to error while adding timeZone', (done) => {
        setupConnectionsWithError(backend);
        service.signup(fakeUsers[0]).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });


    it('should delete timeZone successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.deleteTimeZone(fakeUsers[0]._id, fakeTimeZone._id).subscribe(
            payload => {
                done()
            })
    });


    it('should respond to error while deleting timeZone', (done) => {
        setupConnectionsWithError(backend);
        service.deleteTimeZone(fakeUsers[0]._id, fakeTimeZone._id).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });


    it('should update timeZone successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.updateTimeZone(fakeUsers[0]._id, fakeTimeZone._id, fakeTimeZone).subscribe(
            payload => {
                done()
            })
    });

    it('should repond to error while updating timezone', (done) => {
        setupConnectionsWithError(backend);
        service.updateTimeZone(fakeUsers[0]._id, fakeTimeZone._id, fakeTimeZone).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });


    it('should assign role successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.assignRole(fakeUsers[0]._id, {role: 'regular'}).subscribe(
            payload => {
                done()
            })
    });

    it('should repond to error while assigning role', (done) => {
        setupConnectionsWithError(backend);
        service.assignRole(fakeUsers[0]._id, {role: 'regular'}).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });


    it('should login successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.login({email: fakeUsers[0].email, password: fakeUsers[0].password}).subscribe(
            payload => {
                done()
            })
    });

    it('should repond to error while logging in', (done) => {
        setupConnectionsWithError(backend);
        service.login({email: fakeUsers[0].email, password: fakeUsers[0].password}).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });



    it('should get user detials from backend', (done) => {
        setupConnections(backend, {
            body: fakeUsers[0],
            status: 200
        });
        service.getUserDetails(fakeUsers[0]._id).subscribe(
            payload => {
                done()
            })
    });

    it('should repond to error while getting user details', (done) => {
        setupConnectionsWithError(backend);
        service.getUserDetails( fakeUsers[0]._id).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });



});
