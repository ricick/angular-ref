fs = require 'fs-extra'
util = require 'util'
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

walk = (dir, done) ->
	results = []
	fs.readdir dir, (err, list) ->
		return done(err, []) if err
		pending = list.length
		#return done(null, results) unless pending
		for name in list
			file = "#{dir}/#{name}"
			try
				stat = fs.statSync file
			catch err
				stat = null
			if stat?.isDirectory()
				walk file, (err, res) ->
					results.push name for name in res
					done(null, results) unless --pending
			else
				results.push file
				done(null, results) unless --pending
  
build = (callback, watch) ->
	log "building app"
	options = "co"
	if watch
		options = "wco"
	coffee = shell("coffee -#{ options } bin-dev/assets/js/ src/coffee/")
	coffee.stderr.on 'data', (data) ->
		process.stderr.write data.toString()
	coffee.stdout.on 'data', (data) ->
		print data.toString()
	coffee.on 'exit', (code) ->
		#replaceScriptTags "bin"
		callback?() if code is 0

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
						fs.touchSync(copyname);
						fs.copy filename, copyname, (err) ->
							if (err)
								console.error(err)
		###
	require = shell("node r.js -o build.json")
	
	
task 'build', 'build app', (options) ->
	build(null, true)
	
task 'build-once', 'build app without watching', (options) ->
	build()
	
task 'deploy', 'build app and compile down to deploy version', (options) ->
	deploy()
	