/* eslint-env node,jest */

const Map = require("immutable").Map;

const { Transform } = require("stream");
const mockStream = new Transform();

// const Bonjour = require('bonjour')

const browserSync = require("browser-sync");

// const mockPublish = {
//   // publish: jest.fn((val) => mockStream)
//   publish: args => {
//     console.log("in publish", args);
//     return mockStream;
//   }
// };

// /**
//  *
//  * THIS WORKS
//  */
// jest.mock("bonjour", () => {
//     return jest.fn(() => {
//         console.log("in bonjour constructor");
//         return {
//             publish: args => {
//                 console.log("in publish", args);
//                 return mockStream;
//               }
//             };
//           });
//         });

// const mockBonjour = jest.fn(() => {return {
//   // publish: jest.fn((val) => mockStream)
//   publish: args => {
//     console.log("in publish", args);
//     return mockStream;
//   }
// }})

const mockBonjour = { publish: () => mockStream };

jest.mock("bonjour", () => {
  return jest.fn(() => mockBonjour);
});

// require('bonjour')

// bonjour must be mocked first...
const bsmdns = require("../");

// jest.mock('bonjour'); // this happens automatically with automocking
// const Bonjour = require('bonjour');
// const publish = args => {
//           console.log("in publish", args);
//           return mockStream;
//         };
// Bonjour.mockImplementation(() => {
//   return {
//     publish: publish,
//   };
// });

// const http = require("http");
// const events = require("events");
// console.log(events);
// const spyEmitter = jest.spyOn(events, 'init').mockImplementation(()=> console.log('spied on'));
// const Bonjour = require("nbonjour");
// import Bonjour from 'nbonjour';
// const mockPublish = jest.fn().mockImplementation(() => new EventEmitter());
// jest.mock('nbonjour', () => {
//   return jest.fn().mockImplementation(() => {
//     return {publish: mockPublish,
//       unpublishAll: jest.fn()};
//   });
// });
// const bonjour = jest.genMockFromModule('nbonjour');

// const mockEmitter = jest.fn();

// jest.mock("http");
// jest.mock("events");
// jest.mock("bonjour");

// const bonjour = jest.genMockFromModule('bonjour').default;

// bonjour.publish = jest.fn(() =>  mockEmitter)

// const mockEmitter = jest.genMockFromModule("events");
// const mockPublish = {
//   publish: arg => {
//     console.log("TEST publish", arg);
//     return jest.fn(() => {
//       return { on: jest.fn() };
//     }
//   )
// }};

// jest.mock("bonjour", () => {
//   return function(val) {
//     console.log("init bonjour mock", val);
//     return {
//       publish: arg => {
//         console.log("TEST publish", arg);
//         // const pub = new Object();
//         // pub.on = jest.fn();
//         // return pub;

//         // this feels like a terrible hack.
//         // Part of the issue is that the function being tested
//         // chains events. Streams handle this, fake methods don't
// return mockStream

// jest.mock('bonjour', () => {
//   // return function() {
//     return jest.fn(() => {
//       console.log('in bonjour constructor');
//       // console.log('bonjour val', val)
//       // console.log(mockEmitter);
//       return {
//         publish: (val) => mockEmitter
//         // {
//         //   console.log('bonjour val', val);
//         //   return {on: jest.fn((event => console.log(event)))};
//         // } // mockEmitter
//       }
//     });
// });

// const mockPublish = function() {
//   console.log("mockpublish");
//   return jest.fn().mockImplementation;
// };
// util.inherits(mockPublish, EventEmitter);
// const mockBonjour = jest.fn();
// const mockPublish = jest.fn.mockImplementation(() => {
//   return { publish: jest.fn(() => console.log("mock return")) };
// });

// mockBonjour.mockImplementation(mockPublish);

// require("bonjour")
// const Bonjour = require("bonjour");

// jest.mock("bonjour");

// jest.mock("bonjour", () => mockBonjour);

// const Bonjour = require('bonjour');
// jest.genMockFromModule('bonjour');

// // const mockBonjour = {
// //   publish: jest.fn()
// // }

// class MockBonjour extends EventEmitter {
//   publish() {return this}
// }

// const mockBonjour = new MockBonjour()

// // mock
// // util.inherits(mockBonjour, EventEmitter)
// Bonjour.mockImplementation(() => {
//     return jest.fn().mockImplementation(() =>{
//     return {
//       publish: () => mockBonjour,
//       unpublishAll: jest.fn()
//     };
//   })});

// const bonjour = new Bonjour();
// jest.spyOn(Bonjour, 'publish').mockImplementation(() => {return {options: mockOptions}})

// Bonjour.mockImplementation(() => mockEmitter)

// jest.mock("nbonjour", () => {
//   return jest.fn().mockImplementation(() =>{
//   return {
//     publish: jest.fn(() => mockEmitter),
//     unpublishAll: jest.fn()
//   };
// })});
// const bonjourMock = {
// publish: jest.fn().mockImplementation(() => {
//   return {
//     on: () => {
//       throw new Error('Test error');
//     },
//   };
// }),
//   publish: jest.fn({}),
//   unpublishAll: jest.fn()
// };

// bonjour.create = jest.fn(() => bonjourMock);
// bonjour.create = bonjourMock;

// bonjour.create = jest.fn();

// // Modules to be stubbed
// const os = require("os");
// const http = require("http");
// const mdns = require("mdns");
// jest.mock(mdns);

// const http = require("http");

// const readPkgUp = require("read-pkg-up");
// const portscanner = require("portscanner");
const pkg = { pkg: { name: "package.json" } };
const bsUrlShort = { external: "http://localhost:3000" }; // key: 8 chars, value: 21 chars
const bsUrlLong = { a_much_longer_key: "https://a-very-long-example-url:3001" };
const bsUrls = Object.assign({}, bsUrlShort, bsUrlLong);

const info = jest.fn();
const unprefixed = jest.fn();

const mockOptions = Map({ port: 3000, urls: Map(bsUrls), scheme: "http" });
// jest.mock('browser-sync', () => {
//   // return function() {
//     return {create: jest.fn().mockImplementation(() => {
//       console.log('in browser-sync create');
//       // console.log(mockEmitter);
//     return {  options: mockOptions};
//   })};
// });

// const bs = browserSync.create();
// const bs2 = jest.mock(browserSync.create())
// const bs = jest.fn(() => {
// return {
//   logger: { info, unprefixed },
//   options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" }),
//   emitter: new EventEmitter()}

// })
// bs.{
//   logger: { info, unprefixed },
//   // options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" }),
//   emitter: new EventEmitter()
// };
// jest.mock('browser-sync');

// const bs = jest.genMockFromModule('browser-sync')
// bs.create = jest.fn(() => {

//  return {
//   options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" })
//  };
// })

// console.log(bs);
// require('bonjour')
// jest.mock('bonjour')
/**
 * Left off trying to get the mocked nbonjour object to report calls
 * to it's methods.
 *
 * The problem is likely with mockEmitter, which is just an emitter
 * not a spy. Maybe that needs to be a jest mock function, then use
 * mockImplementation to pass an eventEmitter. Or, we need to mock
 * the events module, then create a mock emitter from that. Unclear since
 * the emitter is an instance.
 */
// console.log(Bonjour)
// let bonjourMock;
// const mockBonjourPublish = jest.fn(arg => {
//   console.log("mockBonjourPublish", arg);
//   // this feels like a terrible hack.
//   // Part of the issue is that the function being tested
//   // chains events. Streams handle this, fake methods don't
//   return mockStream;
// });

// jest.mock('bonjour', () => {
//   return function(val) {
//     console.log("init bonjour mock", val);
//     // return mockBonjourPublish
//     return {
//       publish: mockBonjourPublish //arg => {
//       //     console.log("TEST publish", arg);
//       //     // this feels like a terrible hack.
//       //     // Part of the issue is that the function being tested
//       //     // chains events. Streams handle this, fake methods don't
//       //     return mockStream;
//       //   }
//     };
//   };
// });

describe("Browsersync mDNS plugin", () => {
  beforeEach(() => {
    // console.log(mockPublish())
    // const spyPub = spyOn(mockPublish)
    // jest.mock("bonjour", () => {
    //   return function(val) {
    //     console.log("init bonjour mock", val);
    //     // return mockBonjourPublish
    //     return {
    //       publish: mockBonjourPublish //arg => {
    //       //     console.log("TEST publish", arg);
    //       //     // this feels like a terrible hack.
    //       //     // Part of the issue is that the function being tested
    //       //     // chains events. Streams handle this, fake methods don't
    //       //     return mockStream;
    //       //   }
    //     };
    //   };
    // });
    // console.log('before each')
    // jest.mock('bonjour',
    //   () => {
    //     console.log("where am i?");
    //     return jest.fn().mockImplementation( () => {
    //       return { publish: jest.fn() };
    //       // return mockPublish;
    //     })
    //   }
    // )
    // this.server = jest.mock("http");
    // Bonjour.mockClear();
    // mockEmitter.mockClear();
    // Bonjour.mockImplementation(() => {
    //   return {
    //     create: jest.fn().mockImplementation(() => {
    //       return {
    //         publish: () => {
    //           return publishEmitter;
    //           // throw new Error('Test error');
    //         }
    //       };
    //     })
    //   };
    // });
    // console.log(Bonjour);
    // console.log(Bonjour.create)
    // jest.fn(create (() => {
    //   return {options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" })}
    // })
    // bs.options = Map({ port: 3000, urls: Map(bsUrls), scheme: "http" });
    // bs.create = jest.fn();
    // Bonjour.mockImplementation(() => {
    //   return {
    //     publish: publishEmitter
    //   };
    // });
    // console.log(Bonjour.create().publish());
    // this.bonjourMock = {
    //   publish: jest.fn(),
    //   unpublishAll: jest.fn()
    // };
    // console.log('pre-create', bonjour.create);
    // bonjour.create = jest.fn(() => this.bonjourMock);
    // console.log('post-create', bonjour.create);
    // const info = jest.fn();
    // const unprefixed = jest.fn();
    // this.bs = {
    //   logger: { info, unprefixed },
    //   options: Map({ port: 3000, urls: Map(bsUrls), scheme: "http" }),
    //   emitter: new EventEmitter()
    // };
    //     // this.bs.options.set('urls', bsUrls);
    //     // this.bsmdns = proxyquire("../", {
    //     //   mdns: this.mdns,
    //     //   "read-pkg-up": this.readPkgUp
    //     // });
    // this.bsmdns = require("../");
    // jest.mock("../");
    // jest.mock('nbonjour');
  });

  afterEach(() => jest.resetAllMocks());

  test("Has a name", () => {
    expect(bsmdns["plugin:name"]).toBe("Browsersync mDNS");
  });

  test("Exports a plugin", () => {
    expect(bsmdns.plugin).toBeInstanceOf(Function);
  });

  test("should advertise a service", done => {
    // const bonjour = new Bonjour();
    // bonjour.publish = jest.fn(() => bonjour)
    // console.log(bonjour/)

    const emitterSpy = jest.spyOn(mockStream, "on");
    // const spy = jest.spyOn(browserSync, "create").mockImplementation(() => {
    jest.spyOn(browserSync, "create").mockImplementation(() => {
      return {
        options: mockOptions,
        emitter: mockStream,
        logger: { info, unprefixed }
      };
    });
    const bs = browserSync.create();

    /**
     *
     *
     * Embed the done callback into the publish function
     *
     *
     */
    // mockBonjour.publish = () => {done(); return mockStream }
    const pubSpy = jest.spyOn(mockBonjour, "publish").mockImplementation(() => {
      done();
      return mockStream;
    });

    bsmdns.plugin({}, bs);

    console.log(emitterSpy.mock.calls);
    console.log(pubSpy.mock.calls);

    expect(pubSpy).toBeCalled();
    expect(pubSpy).toHaveBeenCalledTimes(1);
    // // TODO: Is there a better "jest-way" of searching for a property in the last call arg?
    expect(pubSpy.mock.calls[0][0]).toHaveProperty("port", 3000);

    bs.emitter.emit("service:running");
    console.log(info.mock.calls);
    expect(info).toBeCalled();
    expect(unprefixed).toBeCalled();
  });

  /**
   * WTF is going on here? And why was the mocha test passing?
   * What is the scheme supposed to do in Browsersync besides toggling https?
   * Was this test just garbage?
   */
  test.skip("should not advertise without a network connection", () => {
    bs.options = Map({ port: 3000, urls: Map(bsUrlLong) });
    // console.log('bs', bs)
    console.log("calls", bs.logger.info.mock.calls);
    bsmdns.plugin({}, bs);
    bs.emitter.emit("service:running");
    console.log("calls", bs.logger.info.mock.calls);
    expect(bs.logger.info).not.toBeCalled();
    expect(bs.logger.unprefixed).not.toBeCalled();
  });

  //   // , function() {
  //   // });

  test.skip("should use the provided port", done => {
    const port = 4000;

    const emitterSpy = jest.spyOn(mockStream, "on");
    // const spy = jest.spyOn(browserSync, "create").mockImplementation(() => {
    jest.spyOn(browserSync, "create").mockImplementation(() => {
      return {
        options: mockOptions,
        emitter: mockStream,
        logger: { info, unprefixed }
      };
    });
    const bs = browserSync.create();

    /**
     *
     *
     * Embed the done callback into the publish function
     *
     *
     */
    // mockBonjour.publish = () => {done(); return mockStream }
    const pubSpy = jest.spyOn(mockBonjour, "publish").mockImplementation(() => {
      done();
      return mockStream;
    });

    bsmdns.plugin({}, bs);




    // TODO: Is there a better "jest-way" of seraching for a property in the last call arg?
    // expect(pubSpy).toBeCalled();
    // expect(pubSpy.mock.calls[0][0]).toHaveProperty("port", port);
  });

  // test("should use a custom name", () => {
  //   const name = "yogi";
  //   const opts = { name: name };
  //   bsmdns.plugin(opts, bs);
  //   expect(bonjourMock.publish.mock.calls[0][0]).toHaveProperty("name", name);
  // });

  // test("should avoid name collisions by iterating name", ()=>{});

  //   it("should use a custom name")
  //   // , function() {
  //   //   const name = "yogi";
  //   //   const opts = { name: name };
  //   //   this.bsmdns.plugin(opts, this.bs);
  //   //   this.mdns.args.should.have.nested.property("[0][2].name", name);
  //   // });

  //   it("should use http")
  //   // , function() {
  //   //   this.bsmdns.plugin({}, this.bs);
  //   //   this.server.should.not.have.been.called;
  //   // });

  //   it("should use the name from package.json")
  //   // , function() {
  //   //   this.bsmdns.plugin({}, this.bs);
  //   //   this.mdns.args.should.have.nested.property("[0][2].name", "package.json");
  //   // });

  //   it("should fallback to the hostname")
  //   // , function() {
  //   //   const hostname = "test-hostname.dev";
  //   //   const rpu = this.readPkgUp.returns({ pkg: {} });
  //   //   this.os.returns(hostname);

  //   //   var bsmdns = proxyquire("../", {
  //   //     mdns: this.mdns,
  //   //     os: this.os,
  //   //     "read-pkg-up": rpu
  //   //   });
  //   //   bsmdns.plugin({}, this.bs);

  //   //   this.mdns.args.should.have.nested.property("[0][2].name", hostname);
  //   // });
});
