module.exports=function (grunt) {

    grunt.initConfig({
        watch:{
           pug:{
               files:['views/**'],
               options:{
                   livereload: true  //文件改变,重启服务
               }
           },
           js:{
               files:['app.js','schema/**/**.js','routes/**/**.js','public/libs/*.js','model/**/**.js','controllers/**/**.js'],
               options:{
                   livereload: true  //文件改变,重启服务
               }
           }

       },
        nodemon:{   //  修改自动重启
          //开发环境:  =>  dev
            dev:{
                options:{
                    file:'bin/www',
                    args:[],
                    ignore: ['node_modules/**','README.md'],
                    watchFolders:['./'],
                    watchExtension:['js'],
                    debug:true,
                    delayTime:1,  //当nodemon处理多次变动,等待1s之后,没有变动再去重启服务
                    env:{
                        NODE_PORT:8080
                    },
                    cwd: __dirname
                }
            }
        },
        jshint:{
            all:['schema/**/**.js','routes/**/**.js','public/libs/*.js','model/**/**.js','controllers/**/**.js'],
            options:{
                jshintrc:'.jshintrc'  //加载语法规则
            }
        },
        concurrent:{
           target:['jshint','nodemon','watch'],
           options:{
               logConcurrentOutput:true  //开启控制台日志打印
           }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-jshint')  //语法检查
    grunt.loadNpmTasks('grunt-contrib-watch')   //实时监控文件变化
    grunt.loadNpmTasks('grunt-nodemon')  //服务重启
    //grunt.loadNpmTasks('grunt-contrib-less')  //语法检查
    grunt.loadNpmTasks('grunt-concurrent')   //慢任务开发

    grunt.option('force',true);  // 不要因为小错误停止执行任务

    grunt.registerTask('default',['concurrent'])
}