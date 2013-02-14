COFFEE_SRC="src/coffee"
LESS_SRC="src/less"
JS_OUT="bin-dev/assets/js"
CSS_OUT="bin-dev/assets/css"
CSS_DEPLOY="bin/assets/css/main.css"

fs = require 'fs-extra'
less = require 'less'
util = require 'util'
cleanCSS = require 'clean-css'
{print} = require 'sys'
{spawn, exec} = require 'child_process'
{log, error} = console; print = log

run = (name, args...) ->
	proc = spawn(name, args)
	proc.stdout.on('data', (buffer) -> print buffer if buffer = buffer.toString().trim())
	proc.stderr.on('data', (buffer) -> error buffer if buffer = buffer.toString().trim())
	proc.on('exit', (status) -> process.exit(1) if status isnt 0)
	
shell = (cmds, callback) ->
	cmds = [cmds] if Object::toString.apply(cmds) isnt '[object Array]'
	exec(cmds.join(' && '), (err, stdout, stderr) ->
		print trimStdout if trimStdout = stdout.trim()
		error stderr.trim() if err
		callback() if callback
	)

walk = (dir, callback) ->
	results = []
	fs.readdir dir, (err, list) ->
		return callback(err, []) if err
		pending = list.length
		for name in list
			file = "#{dir}/#{name}"
			try
				stat = fs.statSync file
			catch err
				stat = null
			if stat?.isDirectory()
				walk file, (err, res) ->
					results.push name for name in res
					callback(null, results) unless --pending
			else
				results.push file
				callback(null, results) unless --pending
  
build = (watch, callback) ->
	log "building app"
	task_buildLess watch, () ->
		task_buildCoffee watch, ->
			callback?()
	
task_buildCoffee = (watch, callback) ->
	log "compiling coffeescript files"
	options = "co"
	if watch
		options = "wco"
	coffee = shell("coffee -#{ options } #{JS_OUT} #{COFFEE_SRC}")
	coffee.stderr.on 'data', (data) ->
		process.stderr.write data.toString()
	coffee.stdout.on 'data', (data) ->
		print data.toString()
	coffee.on 'exit', (code) ->
		#replaceScriptTags "bin"
		callback?() if code is 0

task_buildLess = (watch, callback) ->
	log "compiling less files"
	try
		fs.mkdirSync CSS_OUT
	catch err
	fs.readdir LESS_SRC, (err, files) ->
		for file in files
			continue if file[0] == '_'
			file = "#{LESS_SRC}/#{file}"
			compileCss file, watch
		callback?()
		return true

compileCss = (filename, watch, callback) ->
	log "compiling #{filename} to css"
	temp = filename.split('/').last()
	out_filename = "#{CSS_OUT}/#{ temp.replace('.less', '.css') }"
	try
		src = fs.readFileSync filename, 'utf8'
		less.render src, (e, css) ->
			log "writing"
			throw e if(e)
			fs.writeFileSync out_filename, css
			log "done"
			if watch
				watchFile( filename, compileCss )
	catch err
		if watch
			watchFile( filename, compileCss )

watchFile = (filename, callback)->
	fs.watchFile filename, persistent:true, interval:1500 , (curr, prev) -> 
		fs.unwatchFile filename
		try
			callback(filename)
		catch err
			null
		
deploy = ->
	build ->
		###
		walk 'bin', (err, results) -> 
			#log results
			for filename in results
				do(filename)->
					if filename.indexOf(".js") isnt -1
						#js files will be taken care of by requirejs optimiser
					else
						other.push filename
						log "copying #{filename} to deploy"
						copyname = "deploy/"+filename.substring(4)
						fs.touchSync copyname
						fs.copy filename, copyname, (err) ->
							if (err)
								console.error(err)
		###
	require = shell("node r.js -o build.json")
	task_compileCss()

task_compileCss = ->
	log "compiling css files"
	src = ''
	walk CSS_OUT, (err, results) ->
		for filename in results
			do(filename)->
				if filename.indexOf(".css") isnt -1
					content = fs.readFileSync filename, 'utf8'
					src += content
		output = cleanCSS.process(src);
		fs.touchSync CSS_DEPLOY
		fs.writeFileSync CSS_DEPLOY, output
	
task 'build', 'build app', (options) ->
	build(true)
	
task 'build-once', 'build app without watching', (options) ->
	build()
	
task 'deploy', 'build app and compile down to deploy version', (options) ->
	deploy()
	
# Helpers
String::endsWith= (str) -> this.substr(this.length - str.length) == str
Array::last= -> this[this.length-1]
	