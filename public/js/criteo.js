if (!window.criteo_q || window.criteo_q instanceof Array) {
	var oldQueue = window.criteo_q || []
	window.removeLater = function(k) {
		setTimeout(function() {
			null !== k && null !== k.parentElement && k.parentElement.removeChild(k)
		}, 3e4)
	}
	window.criteo_q = (function() {
		function k(a) {
			for (var b = document.cookie.split(';'), e = 0; e < b.length; e++) {
				var c = b[e],
					d = c.substr(0, c.indexOf('=')).replace(/^\s+|\s+$/g, ''),
					c = c.substr(c.indexOf('=') + 1)
				if (d === a) return (decodeURIComponent || unescape)(c)
			}
			return null
		}
		function G(a, b) {
			if (a && 1 < a.length) {
				'?' === a[0] && (a = '&' + a.substr(1))
				var e = '&' + b + '=',
					c = a.indexOf(e)
				if (-1 !== c) {
					var d = a.indexOf('&', c + e.length)
					return a.slice(c + e.length, 0 > d ? void 0 : d)
				}
			}
		}
		var A = 0,
			B = [],
			s = function(a, b) {
				try {
					return a.apply(this, b)
				} catch (e) {
					(B[A] = e), (A += 1)
				}
			},
			l = function(a, b, e) {
				var c = a[b]
				a[b] = function() {
					var b = arguments[e]
					arguments[e] = function() {
						s(function() {
							return b.apply(a, arguments)
						})
					}
					return c.apply(this, arguments)
				}
				return c
			}
		l(window, 'setTimeout', 0)
		l(window, 'setInterval', 0)
		l(window, 'addEventListener', 1)
		l(window.document, 'attachEvent', 1)
		var l = (function() {
				var a = navigator.userAgent.match(
						/^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i
					),
					b = !!a,
					a = a && 11 <= parseFloat(a[1])
				return {
					is_safari: b,
					has_itp: a,
				}
			})(),
			c = {
				bodyReady: !1,
				domReady: !1,
				queue: [],
				actions: [],
				disingScheduled: [],
				accounts: [],
				acid: null,
				axid: null,
				pxsig: null,
				idcpy: null,
				idfs: null,
				idfs_read: !1,
				sid: null,
				sid_read: !1,
				tld: null,
				optout: !1,
				ccp: null,
				cop: null,
				ua: l,
				syncframe_loading: l.is_safari,
				waiting_syncframe: l.has_itp,
				is_cbs_enabled: !1,
			},
			d = {
				tagVersion: '4.6.0',
				handlerUrlPrefix:
					('https:' === document.location.protocol
						? 'https://sslwidget.'
						: 'http://widget.') + 'criteo.com/event',
				handlerResponseType: 'single',
				responseType: 'js',
				handlerParams: {
					v: '4.6.0',
				},
				extraData: [],
				customerInfo: [],
				manualDising: !1,
				manualFlush: !1,
				disOnce: !1,
				partialDis: !1,
				idfsCookieName: 'cto_idfs',
				guidCookieName: 'cto_idcpy',
				secureIdCookieName: 'cto_sid',
				lwidCookieName: 'cto_lwid',
				guidCookieRetentionTimeHours: 9490,
				optoutCookieName: 'cto_optout',
				optoutCookieRetentionTimeHours: 43800,
				gumSyncFrameEndPoint:
					window.CriteoSyncFrameUrlOverride ||
					'https://gum.criteo.com/syncframe',
				gumSyncFrameId: 'criteo-syncframe',
				forceSyncFrame: !1,
				eventMap: {
					applaunched: 'al',
					viewitem: 'vp',
					viewhome: 'vh',
					viewlist: 'vl',
					viewbasket: 'vb',
					viewsearch: 'vs',
					tracktransaction: 'vc',
					calldising: 'dis',
					setdata: 'exd',
					setemail: 'ce',
				},
				propMap: {
					event: 'e',
					account: 'a',
					currency: 'c',
					product: 'p',
					item: 'p',
					'item.id': 'i',
					'item.price': 'pr',
					'item.quantity': 'q',
					'product.id': 'i',
					'product.price': 'pr',
					'product.quantity': 'q',
					data: 'd',
					keywords: 'kw',
					checkin_date: 'din',
					checkout_date: 'dout',
					deduplication: 'dd',
					attribution: 'at',
					'attribution.channel': 'ac',
					'attribution.value': 'v',
					user_segment: 'si',
					new_customer: 'nc',
					customer_id: 'ci',
					email: 'm',
					hash_method: 'h',
					transaction_value: 'tv',
					responseType: 'rt',
					page_name: 'pn',
					page_id: 'pi',
					page_number: 'pnb',
					category: 'ca',
					filters: 'f',
					'filters.name': 'fn',
					'filters.operator': 'fo',
					'filters.value': 'fv',
					retailer_visitor_id: 'rvi',
					price: 'pr',
					availability: 'av',
					sub_event_type: 'se',
					store_id: 's',
					zipcode: 'z',
				},
				setters: {
					seturl: {
						cfg: 'handlerUrlPrefix',
						evt: 'url',
					},
					setaccount: {
						cfg: 'account',
						evt: 'account',
					},
					setuat: {
						cfg: 'uat',
						evt: 'uat',
					},
					setcalltype: {
						cfg: 'handlerResponseType',
						evt: 'type',
					},
					setresponsetype: {
						cfg: 'responseType',
						evt: 'type',
					},
					setpartnerpayload: {
						cfg: 'partnerPayload',
						evt: 'payload',
					},
					oninitialized: {
						cfg: 'onInitialized',
						evt: 'callback',
					},
					ondomready: {
						cfg: 'onDOMReady',
						evt: 'callback',
					},
					beforeappend: {
						cfg: 'beforeAppend',
						evt: 'callback',
					},
					aftereval: {
						cfg: 'afterEval',
						evt: 'callback',
					},
					onflush: {
						cfg: 'onFlush',
						evt: 'callback',
					},
				},
				flags: {
					disonce: 'disOnce',
					manualdising: 'manualDising',
					manualflush: 'manualFlush',
					nopartialflush: 'noPartialFlush',
					disonpartialflush: 'partialDis',
				},
			},
			C = [],
			w = function(a, b, e) {
				var c = new Date()
				c.setTime(c.getTime() + 36e5 * e)
				e = 'expires=' + c.toUTCString()
				for (
					var c = document.location.hostname.split('.'), d = null, h = 0;
					h < c.length;
					++h
				) {
					var d = c.slice(c.length - h - 1, c.length).join('.'),
						v = 'domain=.' + d
					document.cookie =
						a +
						'=' +
						(encodeURIComponent || escape)(b) +
						';' +
						e +
						';' +
						v +
						';path=/'
					if ((v = k(a)) && v === b) break
				}
				return d || document.location
			}
		c.tld = (function() {
			var a = w('cto_tld_test', 'woot', 1)
			w('cto_tld_test', '', 0)
			return a
		})()
		var M = function() {
				var a = document.createElement('iframe'),
					b = {
						uid: c.idcpy,
						idfs: c.idfs,
						optout: c.optout,
						sid: c.sid,
						lwid: c.lwid,
						tld: c.tld,
						origin: window.SYNCFRAME_ORIGIN || 'onetag',
						version: d.tagVersion.replace(/\./g, '_'),
					},
					e = d.gumSyncFrameEndPoint
				'#gum-debug-mode' === window.location.hash && (e += '?debug=1')
				e += '#' + JSON.stringify(b)
				a.src = e
				a.id = d.gumSyncFrameId
				a.width = 0
				a.height = 0
				a.frameBorder = 0
				a.setAttribute('style', 'border-width:0px; margin:0px; display:none')
				window.removeLater(a)
				return a
			},
			t = function(a, b, e) {
				w(a, b, e)
				if (window.localStorage)
					try {
						window.localStorage.setItem(a, b)
					} catch (c) {}
			},
			p = function(a) {
				var b
				window.localStorage && (b = window.localStorage.getItem(a))
				return k(a) || b
			},
			x = function(a) {
				w(a, '', 0)
				window.localStorage && window.localStorage.removeItem(a)
			},
			N = function() {
				var a = new Date().getTime()
				'undefined' !== typeof performance &&
					'function' === typeof performance.now &&
					(a += performance.now())
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
					b
				) {
					var e = ((a + 16 * Math.random()) % 16) | 0
					a = Math.floor(a / 16)
					return ('x' === b ? e : (e & 3) | 8).toString(16)
				})
			},
			O = function(a) {
				c.waiting_syncframe =
					c.waiting_syncframe && !a.idcpy && !a.sid && !a.optout && !a.idfs
				c.waiting_syncframe &&
					setTimeout(function() {
						c.waiting_syncframe && ((c.waiting_syncframe = !1), u())
					}, 1e4)
			},
			P = function() {
				if (
					(c.syncframe_loading && window.addEventListener) ||
					d.forceSyncFrame
				) {
					var a = M(),
						b = function(a) {
							var b = a.data
							if (b.isCriteoMessage) {
								a.stopPropagation()
								c.syncframe_loading = !1
								c.idfs_read = b.idfsRead
								if (b.optout)
									(c.optout = !0),
									t(
										d.optoutCookieName,
										'1',
										d.optoutCookieRetentionTimeHours
									),
									x(d.guidCookieName),
									x(d.idfsCookieName),
									x(d.secureIdCookieName)
								else if (b.uid || b.idfs || b.sid)
									b.uid &&
										((a = b.uid),
											(c.idcpy = a),
											t(d.guidCookieName, a, d.guidCookieRetentionTimeHours)),
									b.idfs &&
											((a = b.idfs),
												(c.idfs = a),
												t(d.idfsCookieName, a, d.guidCookieRetentionTimeHours)),
									b.removeSid
										? x(d.secureIdCookieName)
										: b.sid &&
											  ((b = b.sid),
											  (c.sid = b),
											  (c.sid_read = !0),
											  t(
											  		d.secureIdCookieName,
											  		b,
											  		d.guidCookieRetentionTimeHours
											  ))
								c.waiting_syncframe &&
									c.waiting_syncframe &&
									((c.waiting_syncframe = !1), u())
							}
						}
					window.addEventListener &&
						(window.addEventListener('message', b, !0),
							c.queue.push({
								event: 'appendtag',
								element: a,
							}))
				} else c.syncframe_loading = !1
			},
			D = function(a) {
				if (a && a.referrer) {
					var b = a.createElement('a')
					b.href = a.referrer
					return b
				}
				return null
			}
		s(function() {
			c.idcpy = p(d.guidCookieName)
			c.optout = Boolean(p(d.optoutCookieName))
			c.idfs = p(d.idfsCookieName)
			c.sid = p(d.secureIdCookieName)
			var a = p(d.lwidCookieName)
			a ||
				(t(d.lwidCookieName, N(), d.guidCookieRetentionTimeHours),
					(a = p(d.lwidCookieName)))
			c.lwid = a || 'NA'
			var a = k('criteo_acid'),
				b = k('cto_axid'),
				e = k('cto_pxsig'),
				g = k('cto_optout')
			null === a && null === b && null === g && null === e
				? ((a = new Date()),
				  a.setTime(a.getTime() + 1e4),
				  (a = 'expires=' + a.toUTCString()),
				  (document.cookie = [
						'criteo_write_test=ChUIBBINbXlHb29nbGVSdGJJZBgBIAE',
						'path=/',
						a,
				  ].join('; ')),
				  (a = k('criteo_write_test')),
				  (c.canWriteCookie = null !== a),
				  (document.cookie =
						'criteo_write_test=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'))
				: ((c.acid = a),
				  (c.axid = null !== g ? 'optout' : b),
				  (c.pxsig = e),
				  (c.canWriteCookie = !0))
			var a = window,
				f,
				h
			try {
				h = a.top.location.search
			} catch (v) {
				b = a
				try {
					for (; b.parent.document !== b.document; )
						if (b.parent.document) b = b.parent
						else break
				} catch (m) {}
				if (b && (b = D(b.document))) h = b.search
			}
			h && (f = G(h, 'cto_pld'))
			if (!f)
				try {
					var l = D(a.top.document)
					l && l.search && (f = G(l.search, 'cto_pld'))
				} catch (n) {}
			f && (c.cop = f)
			O(c)
		})
		s(function() {
			var a = k('criteo_cookie_perm')
			null !== a && (c.ccp = a)
		})
		var R = function(a) {
				(function e() {
					document.body ? setTimeout(a, 0) : setTimeout(e, 10)
				})()
			},
			y = function(a) {
				return 'undefined' === typeof a || '' === a
			},
			E = function(a, b) {
				c.is_cbs_enabled && y(a.page_id) && (a.page_id = b)
			},
			S = function(a, b) {
				if ('complete' === a.readyState) b()
				else if (a.addEventListener)
					a.addEventListener('DOMContentLoaded', b, !1),
					window.addEventListener('load', b, !1)
				else {
					a.attachEvent('onreadystatechange', b)
					window.attachEvent('onload', b)
					var e = !1
					try {
						e = null === window.frameElement && document.documentElement
					} catch (c) {}
					if (e && e.doScroll)
						(function Q() {
							if (e) {
								try {
									e.doScroll('left')
								} catch (a) {
									return setTimeout(Q, 50)
								}
								b()
							}
						})()
					else {
						var d = !1,
							h = a.onload,
							k = a.onreadystatechange
						a.onload = a.onreadystatechange = function() {
							k instanceof Function && k()
							if (
								!d &&
								(!a.readyState ||
									'loaded' === a.readyState ||
									'complete' === a.readyState)
							)
								h instanceof Function && h(), (d = !0), b()
						}
					}
				}
			},
			H = function() {
				s(function() {
					var a = null
					performance && (a = performance.now())
					for (var b = 0; b < arguments.length; ++b) c.queue.push(arguments[b])
					u()
					b = !1
					if (200 < d.extraData.length) b = !0
					else
						for (var e = 0; e < d.extraData.length; ++e) {
							var g = d.extraData[e],
								f = 0
							if (Object.keys) f = Object.keys(g).length
							else
								for (var h in g)
									Object.prototype.hasOwnProperty.call(g, h) && (f += 1)
							if (200 < f) {
								b = !0
								break
							}
						}
					b && (d.extraData = [])
					d.customerInfo = []
					c.is_cbs_enabled = !1
					performance && ((a = performance.now() - a), (C.pushTime = a))
				}, arguments)
			},
			u = function() {
				for (var a = [], b = c.queue, e = 0; e < b.length; ++e) {
					var g = b[e]
					if (g instanceof Array) b.splice.apply(b, [e + 1, 0].concat(g))
					else if (g instanceof Function) b.splice(e + 1, 0, g())
					else if (g && '[object Object]' === g.toString())
						switch (q(g, e, b, a)) {
						case 0:
							a.push(g)
							break
						case -1:
							(a = a.concat(b.slice(e))), (e = b.length)
						}
				}
				d.afterEval instanceof Function && (a = d.afterEval(b, a, c, d))
				c.queue = a || []
				!d.manualFlush &&
					((!d.noPartialFlush || 0 === c.queue.length) &&
						!c.waiting_syncframe) &&
					I(0 !== c.queue.length)
			},
			q = function(a, b, e, g) {
				if (!c.domReady && a.requiresDOM && 'no' !== a.requiresDOM)
					return 'blocking' === a.requiresDOM ? -1 : 0
				delete a.requiresDOM
				if (!a.event) return m(a), 1
				a.account && F(a.account, c.accounts)
				var f = a.event
				a.event = a.event.toLowerCase()
				switch (a.event) {
				case 'setdata':
					return (a = m(a)), J(a), K(c.actions, m(a)), 1
				case 'setparameter':
					for (var h in a)
						'event' !== h.toLowerCase() &&
								a.hasOwnProperty(h) &&
								(d.handlerParams[h] = a[h])
					return 1
				case 'calldising':
					a.hasOwnProperty('account') || (a.account = c.accounts)
					b = d.handlerResponseType
					a.hasOwnProperty('type') && ((b = a.type), delete a.type)
					F(a.account, c.disingScheduled)
					'sequential' === b && (a.dc = !0)
					break
				case 'setcustomerid':
					return (
						(a.event = 'setdata'), (a.customer_id = a.id), delete a.id, q(a)
					)
				case 'setretailervisitorid':
					return (
						(c.is_cbs_enabled = !0),
						(a.event = 'setdata'),
						(a.retailer_visitor_id = a.id),
						delete a.id,
						q(a)
					)
				case 'setemail':
				case 'sethashedemail':
				case 'ceh':
					a.event = 'setemail'
					if (a.hasOwnProperty('email')) {
						a.email instanceof Array || (a.email = [a.email])
						b = a.email
						e = []
						for (g = 0; g < b.length; g++)
							void 0 !== b[g] && null !== b[g] && e.push(String(b[g]))
						a.email = e
					}
					b = m(a)
					d.customerInfo.push(b)
					L(c.actions, m(a))
					return 1
				case 'setsitetype':
					b = 'd'
					if ('mobile' === a.type || 'm' === a.type) b = 'm'
					if ('tablet' === a.type || 't' === a.type) b = 't'
					a.event = 'setdata'
					delete a.type
					a.site_type = b
					return q(a)
				case 'appendtag':
					if (
						c.bodyReady &&
							(!d.container || !document.body.contains(d.container))
					)
						(b = document.body)
							? ((e = document.createElement('div')),
								  e.setAttribute('id', 'criteo-tags-div'),
								  (e.style.display = 'none'),
								  b.appendChild(e),
								  (b = e))
							: (b = void 0),
						(d.container = b)
					a.url &&
							(a.isImgUrl
								? ((b = document.createElement('img')),
								  b.setAttribute('style', 'display:none;'),
								  b.setAttribute('width', '1'),
								  b.setAttribute('height', '1'))
								: ((b = document.createElement('script')),
								  b.setAttribute('async', 'true'),
								  b.setAttribute('type', 'text/javascript')),
								b.setAttribute('src', a.url),
								(a.element = b))
					d.beforeAppend instanceof Function &&
							(a.element = d.beforeAppend(a.element, c, d))
					m(a)
					if (a.element && (a.element.tagName || a.isImgUrl))
						if (
							!d.container &&
								('script' === a.element.tagName.toLowerCase() || a.isImgUrl)
						)
							(b = document.getElementsByTagName('script')[0]),
							a.element.setAttribute('data-owner', 'criteo-tag'),
							b.parentNode.insertBefore(a.element, b),
							window.removeLater(a.element)
						else if (d.container)
							d.container.appendChild(a.element),
							window.removeLater(a.element)
						else return 0
					return 1
				case 'gettagstate':
					return a.callback instanceof Function ? a.callback(c, d) : 1
				case 'viewsearchresult':
				case 'viewcategory':
					E(a, f)
					a.event = 'viewlist'
					break
				case 'viewlist':
					c.is_cbs_enabled &&
							y(a.page_id) &&
							(y(a.category)
								? y(a.keywords)
									? (a.page_id = 'viewList')
									: (a.page_id = 'viewSearchResult')
								: (a.page_id = 'viewCategory'))
					break
				case 'viewitem':
				case 'viewhome':
				case 'viewbasket':
				case 'tracktransaction':
					E(a, f)
					break
				case 'viewstore':
					E(a, f)
					a.event = 'viewHome'
					a.sub_event_type = 's'
					break
				case 'flush':
				case 'flushevents':
					return I(b !== e.length - 1 || 0 !== g.length), 1
				}
				if ((b = d.setters[a.event])) return (d[b.cfg] = a[b.evt]), 1
				if ((b = d.flags[a.event])) return (d[b] = !0), 1
				c.actions.push(m(a))
				return 1
			},
			I = function(a) {
				d.onFlush instanceof Function &&
					(c.actions = d.onFlush(c.actions, c, d))
				if (0 !== c.actions.length) {
					for (var b = 0; b < d.extraData.length; ++b)
						K(c.actions, d.extraData[b])
					for (b = 0; b < d.customerInfo.length; ++b)
						L(c.actions, d.customerInfo[b])
					if (!d.manualDising && (!a || d.partialDis)) {
						a = []
						for (b = 0; b < c.accounts.length; ++b)
							z(c.disingScheduled, c.accounts[b]) || a.push(c.accounts[b])
						0 < a.length &&
							q({
								event: 'callDising',
								account: a,
							})
					}
					a = c.actions
					b = []
					1 === c.accounts.length && (d.account = c.accounts[0])
					d.account && b.push('a=' + n(d.account, []))
					'js' !== d.responseType && b.push('rt=' + n(d.responseType, []))
					if (d.handlerParams) {
						var e = decodeURIComponent(n(d.handlerParams, []))
						e && b.push(e)
					}
					d.uat &&
						c.is_cbs_enabled &&
						b.push('uat=' + (encodeURIComponent || escape)(d.uat))
					for (e = 0; e < a.length; ++e)
						a[e].account && r(d.account, a[e].account) && delete a[e].account,
						b.push('p' + e + '=' + n(a[e], []))
					null !== c.acid && b.push('acid=' + c.acid)
					null !== c.axid && b.push('axid=' + c.axid)
					null !== c.pxsig && b.push('pxsig=' + c.pxsig)
					c.canWriteCookie && b.push('adce=1')
					null !== c.ccp && b.push('ccp=' + c.ccp)
					null !== c.cop && b.push('cop=' + c.cop)
					c.idcpy &&
						(b.push('idcpy=' + c.idcpy),
							b.push('iddom=' + document.location.hostname))
					c.idfs && b.push('idfs=' + c.idfs)
					c.idfs_read && b.push('idfs_read=1')
					c.optout && b.push('optout=1')
					c.sid &&
						(b.push('sid=' + c.sid),
							b.push('sid_read=' + (c.sid_read ? '1' : '0')))
					c.lwid && b.push('lwid=' + c.lwid)
					c.tld && b.push('tld=' + c.tld)
					k('cto_clc') && b.push('clc=1')
					d.partnerPayload && b.push('pp=' + n(d.partnerPayload, []))
					b.push('dtycbr=' + Math.floor(1e5 * Math.random()))
					a = b.join('&')
					a = {
						event: 'appendTag',
						url: d.handlerUrlPrefix + '?' + a,
						isImgUrl: 'gif' === d.responseType,
					}
					c.actions = []
					q(a)
					d.disOnce || (c.disingScheduled = [])
				}
			},
			J = function(a) {
				for (var b = 0; b < d.extraData.length; ++b) {
					var e = d.extraData[b]
					if (
						e.event === a.event &&
						(('undefined' === typeof a.account &&
							'undefined' === typeof e.account) ||
							r(a.account, e.account))
					) {
						for (var c in a) 'account' !== c && (e[c] = a[c])
						return
					}
				}
				d.extraData.push(a)
			},
			K = function(a, b) {
				for (var e = 0; e < a.length; ++e) {
					var c = a[e]
					if (c.event === b.event && r(b.account, c.account)) {
						for (var d in b)
							b.hasOwnProperty(d) && 'account' !== d && (c[d] = b[d])
						return
					}
				}
				a.push(b)
			},
			L = function(a, b) {
				for (var c = 0; c < a.length; ++c) {
					var d = a[c]
					if (
						d.event === b.event &&
						r(b.account, d.account) &&
						('hash_method' in b ? b.hash_method : '') ===
							('hash_method' in d ? d.hash_method : '')
					) {
						if (b.hasOwnProperty('email')) {
							for (
								var c = d, d = d.email, f = b.email, h = [], k = 0;
								k < f.length;
								++k
							)
								z(d, f[k]) || h.push(f[k])
							d = d.concat(h)
							c.email = d
						}
						return
					}
				}
				a.push(b)
			},
			m = function(a) {
				var b = a
				if (a instanceof Function)
					return (b = a()), b instanceof Function ? b : m(b)
				if (a instanceof Array)
					for (var b = [], c = 0; c < a.length; ++c) b[c] = m(a[c])
				else if (a && '[object Object]' === a.toString())
					for (c in ((b = {}), a)) a.hasOwnProperty(c) && (b[c] = m(a[c]))
				return b
			},
			T = function(a, b) {
				var c = b.join('.')
				return d.propMap[c] ? d.propMap[c] : a
			},
			r = function(a, b) {
				if (!(a instanceof Array)) return r([a], b)
				if (!(b instanceof Array)) return r(a, [b])
				if (a.length !== b.length) return !1
				for (var c = 0; c < a.length; ++c) if (!z(b, a[c])) return !1
				return !0
			},
			n = function(a, b) {
				var c = ''
				if (a instanceof Function) c = n(a(), b)
				else if (a instanceof Array) {
					for (var g = [], f = 0; f < a.length; ++f) g[f] = n(a[f], b)
					c += '[' + g.join(',') + ']'
				} else if (a && '[object Object]' === a.toString()) {
					g = []
					for (f in a)
						if (a.hasOwnProperty(f)) {
							var h = b.concat([f])
							g.push(T(f, h) + '=' + n(a[f], h))
						}
					c += g.join('&')
				} else
					c =
						1 === b.length && 'event' === b[0]
							? c +
							  (d.eventMap[a.toLowerCase()] ? d.eventMap[a.toLowerCase()] : a)
							: c + a
				return (encodeURIComponent || escape)(c)
			},
			F = function(a, b) {
				if (a instanceof Array) for (var c = 0; c < a.length; ++c) F(a[c], b)
				else z(b, a) || b.push(a)
			},
			z = function(a, b) {
				for (
					var c = JSON.stringify || encodeURIComponent || escape,
						d = c(b),
						f = 0;
					f < a.length;
					++f
				)
					if (a[f] === b || c(a[f]) === d) return !0
				return !1
			},
			U = function(a) {
				try {
					var b = D(a)
					b &&
						b.hostname !== a.location.hostname &&
						J({
							event: 'setData',
							ref: b.protocol + '//' + b.hostname,
						})
				} catch (c) {}
			},
			V = function(a, b) {
				if (a && b) {
					var c = /^\#(enable|disable)-criteo-tag-debug-mode(\=(\d+))?$/.exec(b)
					if (c && 4 == c.length) {
						var d = 'enable' == c[1],
							f = c[3],
							c = 'criteoTagDebugMode='
						d && (f && !isNaN(f)) && (c += parseInt(f, 10))
						d = d ? new Date().getTime() + 864e5 : 0
						d = 'expires=' + new Date(d).toUTCString()
						document.cookie = [c, 'path=/', d].join('; ')
						window.location.href = window.location.href.substr(
							0,
							window.location.href.indexOf('#')
						)
					}
				}
			},
			W = function(a) {
				if (a) {
					var b = a.createElement('script')
					b.setAttribute('type', 'text/javascript')
					b.setAttribute(
						'src',
						a.location.protocol +
							'//static.criteo.net/js/ld/ld-tag-debug.4.6.0.js'
					)
					a = a.getElementsByTagName('script')[0]
					a.parentNode.insertBefore(b, a)
				}
			}
		return s(function() {
			R(function() {
				c.bodyReady =
					d.onInitialized instanceof Function ? d.onInitialized(c, d) : !0
				P()
				u()
			})
			S(document, function() {
				c.domReady = d.onDOMReady instanceof Function ? d.onDOMReady(c, d) : !0
				u()
			})
			U(document)
			V(document, window.location.hash)
			var a
			a = document
				? 'function' != typeof Array.prototype.indexOf
					? !1
					: -1 !== document.cookie.indexOf('criteoTagDebugMode=')
				: !1
			if (a) {
				var b = {
					originalPush: H,
					stagedPushes: [],
					stagedErrors: [],
					m_state: c,
					m_config: d,
					performances: C,
					exceptions: B,
					push: function() {
						0 < arguments.length && this.stagedPushes.push(arguments)
					},
					pushError: function(a) {
						this.stagedErrors.push(a)
					},
				}
				window.onerror = (function(a) {
					return function(c, d, h, k) {
						b.pushError({
							message: c,
							url: d,
							lineNumber: h,
							column: k,
						})
						return a && 'function' === typeof a ? a.apply(this, arguments) : !1
					}
				})(window.onerror)
				W(document)
				return b
			}
			return {
				push: H,
				performances: C,
				exceptions: B,
			}
		})
	})()
	window.criteo_q.push.apply(window.criteo_q, oldQueue)
}
