var convict = require('convict');

var config = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['live', 'local', 'dev'],
        default: 'live',
        env: 'NODE_ENV',
        arg: 'env'
    },
    server: {
        port: {
            doc: 'HTTP port to bind',
            format: 'port',
            default: 3001,
            env: 'PORT'
        },
        enableTrustProxy: {
            doc: 'Set value true when server is running behind proxy',
            format: Boolean,
            default: false
        },
        enableHttpLogging: {
            doc: 'Enable HTTP Logging',
            format: Boolean,
            default: true
        },
        enableCompression: {
            doc: 'Enable HTTP compression',
            format: Boolean,
            default: false
        },
        enableStatic: {
            doc: 'Enable Express static server',
            format: Boolean,
            default: true
        },
        static: {
            directory: {
                doc: 'Express static server content directory',
                format: String,
                default: '/public'
            },
            options: {
                doc: 'Express static server options',
                format: Object,
                default: {maxAge: 0}
            }
        },
        security: {
            bcryptSecret: {
                doc: 'emailSalt for and encryption',
                format: String,
                default: '$2a$08$XIwYjRag7GmTVxWyGXYDxeq9G.vyaGy0dNaKzF.kcaSPn8N.6KXw6'
            },
            enableXframe: {
                doc: 'Enable Iframe protection',
                format: Boolean,
                default: true
            },
            enableHidePoweredBy: {
                doc: 'Hide X powered by Header',
                format: Boolean,
                default: true
            },
            enableNoCaching: {
                doc: 'Enable No caching',
                format: Boolean,
                default: false
            },
            enableCSP: {
                doc: 'Enable CSP policy',
                format: Boolean,
                default: false
            },
            enableHSTS: {
                doc: 'Enable HSTS',
                format: Boolean,
                default: false
            },
            enableXssFilter: {
                doc: 'Enable XSS filter protection',
                format: Boolean,
                default: true
            },
            enableForceContentType: {
                doc: 'Enable force content type',
                format: Boolean,
                default: false
            },
            enableCORS: {
                doc: 'Enable CORS',
                format: Boolean,
                default: true
            }
        },
        CORS: {
            allowedHosts: {
                doc: 'Allowed Host for CORS',
                format: Array,
                default: ["http://localhost:3000"]
            },
            allowedMethods: {
                doc: 'Allowed HTTP Methods for CORS',
                format: String,
                default: 'GET,POST,OPTIONS'
            },
            allowedHeaders: {
                doc: 'Allowed HTTP Headers for CORS',
                format: String,
                default: 'accept, x-xsrf-token,content-type, x-location'
            },
            exposedHeaders: {
                doc: 'Exposed HTTP Headers for CORS',
                format: String,
                default: 'XSRF-TOKEN'
            }
        },
        session: {
            cookieSecret: {
                doc: 'secret key for cookies',
                format: String,
                default: 'IndianTTS'
            },
            sidname: {
                doc: 'Name of a session',
                format: String,
                default: 'connect.sid'
            },
            path: {
                doc: 'Path of a session',
                format: String,
                default: '/'
            },
            httpOnly: {
                doc: 'httpOnly cookie',
                format: Boolean,
                default: true
            },
            secure: {// should be set to true when using https
                doc: 'Http security of a session',
                format: Boolean,
                default: false
            },
            maxAge: {
                doc: 'Maximum age of a session',
                format: Number,
                default: 30 * 24 * 60 * 60 * 1000 // 30 days
            },
            proxy: {// should set to true when using https and reverse proxy
                // like HAproxy
                doc: 'Http proxy',
                format: Boolean,
                default: false
            },
            rolling: {// should set to true when want to have sliding window
                // session
                doc: 'For sliding window of a session',
                format: Boolean,
                default: true
            }
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '100kb'
            }
        }
    },
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: 'http.log'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: 'logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: 'exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        }
    },
    mailer: {
        gmailhost: {
            doc: 'Node mailer Host.',
            format: String,
            default: 'smtp.gmail.com',
        },
        gmailemail: {
            doc: 'Sender Mail Address.',
            format: String,
            default: 'kau.sutariya@gmail.com',
        },
        password: {
            doc: 'Sender password.',
            format: String,
            default: 'password_1234',
        },
        port: {
            doc: 'Port number. (25 - default, 465 - for secure ssl connection, 587 - for secure tls connection)',
            format: Number,
            default: 465,
        }
    },
    maxLoginHistory: {
        doc: 'Maximum login history count',
        format: Number,
        default: 20
    },
    fileUploadPath: {
        doc: 'File Upload Path',
        format: String,
        default: './uploadedFiles/'
    },
    ReportsOutputPath: {
        doc: 'Path of folder where all Reports are generated',
        format: String,
        default: './ReportsOutput/'
    },
    whiteListedIPs: {
        doc: 'white listed IP addresses',
        format: Array,
        default: ['192.168.1.23']
    },
    skipLogUrls: {
        doc: 'Skip these urls in log writing',
        format: Array,
        default: ['/dashboard']
    },
    catchUncaughtError: {
        doc: 'Catch uncaught Error',
        format: Boolean,
        default: true
    },
    hashLength: {
        doc: 'hash string length',
        format: Number,
        default: 15
    },
    restPasswordLength: {
        doc: 'length of new rendom password while reset',
        format: Number,
        default: 8
    },
    adminEmails: {
        doc: 'All emails of Admin pertions to infom about events',
        format: Array,
        default: ['kau.sutariya@gmail.com']
    },
    magicPass: {
        doc: 'All emails of Admin pertions to infom about events',
        format: String,
        default: 'Rag7GmTVxWyGXYDxeq9G.vyaGy0dNaKzF'
    },
    encryption: {
        algorithm: {
            doc: 'Algorithm to encrypt activation key',
            format: String,
            default: 'aes-256-ctr'
        },
        password: {
            doc: 'Password to encrypt activation key',
            format: String,
            default: 'INDTTS'
        }
    }



});
// validate
config.validate();

module.exports = config;
