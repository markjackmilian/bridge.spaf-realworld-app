/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0
 */
Bridge.assembly("Bridge.Messenger", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Messenger.IMessenger", {
        $kind: "interface"
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @param   {TSender}    arg1    
     * @param   {TArgs}      arg2
     * @return  {void}
     */

    Bridge.define("Bridge.Messenger.Messenger", {
        inherits: [Bridge.Messenger.IMessenger],
        fields: {
            _calls: null
        },
        alias: [
            "Send$1", "Bridge$Messenger$IMessenger$Send$1",
            "Send", "Bridge$Messenger$IMessenger$Send",
            "Subscribe$1", "Bridge$Messenger$IMessenger$Subscribe$1",
            "Subscribe", "Bridge$Messenger$IMessenger$Subscribe",
            "Unsubscribe$1", "Bridge$Messenger$IMessenger$Unsubscribe$1",
            "Unsubscribe", "Bridge$Messenger$IMessenger$Unsubscribe",
            "ResetMessenger", "Bridge$Messenger$IMessenger$ResetMessenger"
        ],
        ctors: {
            init: function () {
                this._calls = new (System.Collections.Generic.Dictionary$2(System.Object,System.Collections.Generic.List$1(System.Object)))();
            }
        },
        methods: {
            /**
             * Send Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {Function}    TArgs      TMessageArgs
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @param   {TArgs}       args       Args
             * @return  {void}
             */
            Send$1: function (TSender, TArgs, sender, message, args) {
                if (sender == null) {
                    throw new System.ArgumentNullException("sender");
                }
                this.InnerSend(message, TSender, TArgs, sender, args);
            },
            /**
             * Send Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @return  {void}
             */
            Send: function (TSender, sender, message) {
                if (sender == null) {
                    throw new System.ArgumentNullException("sender");
                }
                this.InnerSend(message, TSender, null, sender, null);
            },
            /**
             * Subscribe Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe$1: function (TSender, TArgs, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender), Bridge.cast(Bridge.unbox(args), TArgs));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, TArgs, wrap);
            },
            /**
             * Subscribe Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe: function (TSender, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, null, wrap);
            },
            /**
             * Unsubscribe action with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe$1: function (TSender, TArgs, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, TArgs, subscriber);
            },
            /**
             * Unsubscribe action without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe: function (TSender, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, null, subscriber);
            },
            /**
             * Remove all callbacks
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @return  {void}
             */
            ResetMessenger: function () {
                this._calls.clear();
            },
            InnerSend: function (message, senderType, argType, sender, args) {
                var $t;
                if (message == null) {
                    throw new System.ArgumentNullException("message");
                }
                var key = { item1: message, item2: senderType, item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }
                var actions = this._calls.get(key);
                if (actions == null || !System.Linq.Enumerable.from(actions).any()) {
                    return;
                }

                var actionsCopy = System.Linq.Enumerable.from(actions).toList(System.Object);
                $t = Bridge.getEnumerator(actionsCopy);
                try {
                    while ($t.moveNext()) {
                        var action = $t.Current;
                        if (actions.contains(action)) {
                            action.item2(sender, args);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            InnerSubscribe: function (subscriber, message, senderType, argType, callback) {
                if (message == null) {
                    throw new System.ArgumentNullException("message");
                }
                var key = { item1: message, item2: senderType, item3: argType };
                var value = { item1: subscriber, item2: callback };
                if (this._calls.containsKey(key)) {
                    this._calls.get(key).add(value);
                } else {
                    var list = function (_o1) {
                            _o1.add(value);
                            return _o1;
                        }(new (System.Collections.Generic.List$1(System.Object))());
                    this._calls.set(key, list);
                }
            },
            InnerUnsubscribe: function (message, senderType, argType, subscriber) {
                var $t;
                if (subscriber == null) {
                    throw new System.ArgumentNullException("subscriber");
                }
                if (message == null) {
                    throw new System.ArgumentNullException("message");
                }

                var key = { item1: message, item2: senderType, item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }

                var toremove = System.Linq.Enumerable.from(this._calls.get(key)).where(function (tuple) {
                        return Bridge.referenceEquals(tuple.item1, subscriber);
                    });

                $t = Bridge.getEnumerator(toremove);
                try {
                    while ($t.moveNext()) {
                        var tuple = $t.Current;
                        this._calls.get(key).remove(tuple);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                if (!System.Linq.Enumerable.from(this._calls.get(key)).any()) {
                    this._calls.remove(key);
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuTWVzc2VuZ2VyLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJNZXNzZW5nZXIuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVlnQkEsS0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFVS0EsU0FBU0EsT0FBT0EsUUFBZ0JBLFNBQWdCQTtnQkFFN0RBLElBQUlBLFVBQVVBO29CQUNWQSxNQUFNQSxJQUFJQTs7Z0JBQ2RBLGVBQWVBLFNBQVNBLEFBQU9BLFNBQVVBLEFBQU9BLE9BQVFBLFFBQVFBOzs7Ozs7Ozs7Ozs7Ozs0QkFTbkRBLFNBQVNBLFFBQWdCQTtnQkFFdENBLElBQUlBLFVBQVVBO29CQUNWQSxNQUFNQSxJQUFJQTs7Z0JBQ2RBLGVBQWVBLFNBQVNBLEFBQU9BLFNBQVVBLE1BQU1BLFFBQVFBOzs7Ozs7Ozs7Ozs7Ozs7OzttQ0FZckNBLFNBQVNBLE9BQU9BLFlBQW1CQSxTQUFnQkEsVUFDckVBOztnQkFFQUEsSUFBSUEsY0FBY0E7b0JBQ2RBLE1BQU1BLElBQUlBOztnQkFDZEEsSUFBSUEsOEJBQVlBO29CQUNaQSxNQUFNQSxJQUFJQTs7O2dCQUVkQSxXQUE4QkEsVUFBQ0EsUUFBUUE7b0JBRW5DQSxXQUFXQSxZQUFTQTtvQkFDcEJBLElBQUlBLFVBQVVBLFFBQVFBLDZCQUFRQTt3QkFDMUJBLFNBQVNBLFlBQVNBLGtCQUFRQSxZQUFPQTs7OztnQkFHekNBLG9CQUFvQkEsWUFBWUEsU0FBU0EsQUFBT0EsU0FBVUEsQUFBT0EsT0FBUUEsQUFBdUNBOzs7Ozs7Ozs7Ozs7Ozs7O2lDQVc5RkEsU0FBU0EsWUFBbUJBLFNBQWdCQSxVQUM5REE7O2dCQUVBQSxJQUFJQSxjQUFjQTtvQkFDZEEsTUFBTUEsSUFBSUE7O2dCQUNkQSxJQUFJQSw4QkFBWUE7b0JBQ1pBLE1BQU1BLElBQUlBOzs7Z0JBRWRBLFdBQThCQSxVQUFDQSxRQUFRQTtvQkFFbkNBLFdBQVdBLFlBQVNBO29CQUNwQkEsSUFBSUEsVUFBVUEsUUFBUUEsNkJBQVFBO3dCQUMxQkEsU0FBU0EsWUFBU0E7Ozs7Z0JBRzFCQSxvQkFBb0JBLFlBQVlBLFNBQVNBLEFBQU9BLFNBQVVBLE1BQU1BLEFBQXVDQTs7Ozs7Ozs7Ozs7Ozs7O3FDQVVuRkEsU0FBU0EsT0FBT0EsWUFBbUJBO2dCQUV2REEsc0JBQXNCQSxTQUFTQSxBQUFPQSxTQUFVQSxBQUFPQSxPQUFRQTs7Ozs7Ozs7Ozs7Ozs7bUNBUzNDQSxTQUFTQSxZQUFtQkE7Z0JBRWhEQSxzQkFBc0JBLFNBQVNBLEFBQU9BLFNBQVVBLE1BQU1BOzs7Ozs7Ozs7Ozs7Z0JBUXREQTs7aUNBR21CQSxTQUFnQkEsWUFBaUJBLFNBQWNBLFFBQWVBOztnQkFFakZBLElBQUlBLFdBQVdBO29CQUNYQSxNQUFNQSxJQUFJQTs7Z0JBQ2RBLFVBQVVBLFNBQThCQSxnQkFBU0EsbUJBQVlBO2dCQUM3REEsSUFBSUEsQ0FBQ0Esd0JBQXdCQTtvQkFDekJBOztnQkFDSkEsY0FBY0EsZ0JBQVlBO2dCQUMxQkEsSUFBSUEsV0FBV0EsUUFBUUEsQ0FBQ0EsNEJBQWdHQTtvQkFDcEhBOzs7Z0JBRUpBLGtCQUFrQkEsNEJBQW1HQSxnQkFBckVBO2dCQUNoREEsMEJBQXVCQTs7Ozt3QkFFbkJBLElBQUlBLGlCQUFpQkE7NEJBQ2pCQSxhQUFhQSxRQUFRQTs7Ozs7Ozs7c0NBSUxBLFlBQW1CQSxTQUFnQkEsWUFBaUJBLFNBQzVFQTtnQkFFQUEsSUFBSUEsV0FBV0E7b0JBQ1hBLE1BQU1BLElBQUlBOztnQkFDZEEsVUFBVUEsU0FBOEJBLGdCQUFTQSxtQkFBWUE7Z0JBQzdEQSxZQUFZQSxTQUEwQ0EsbUJBQVlBO2dCQUNsRUEsSUFBSUEsd0JBQXdCQTtvQkFFeEJBLGdCQUFZQSxTQUFTQTs7b0JBSXJCQSxXQUFXQSxBQUF3RUEsVUFBQ0E7NEJBQU9BLFFBQVFBOzRCQUFPQSxPQUFPQTswQkFBaEZBLEtBQUlBO29CQUNyQ0EsZ0JBQVlBLEtBQU9BOzs7d0NBSUdBLFNBQWdCQSxZQUFpQkEsU0FBY0E7O2dCQUV6RUEsSUFBSUEsY0FBY0E7b0JBQ2RBLE1BQU1BLElBQUlBOztnQkFDZEEsSUFBSUEsV0FBV0E7b0JBQ1hBLE1BQU1BLElBQUlBOzs7Z0JBRWRBLFVBQVVBLFNBQThCQSxnQkFBU0EsbUJBQVlBO2dCQUM3REEsSUFBSUEsQ0FBQ0Esd0JBQXdCQTtvQkFDekJBOzs7Z0JBRUpBLGVBQWVBLDRCQUFrR0EsZ0JBQVlBLFlBQUtBLEFBQWlHQTsrQkFBU0Esb0NBQWVBOzs7Z0JBRTNQQSwwQkFBc0JBOzs7O3dCQUNsQkEsZ0JBQVlBLFlBQVlBOzs7Ozs7O2dCQUU1QkEsSUFBSUEsQ0FBQ0EsNEJBQWdHQSxnQkFBWUE7b0JBQzdHQSxtQkFBbUJBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuTWVzc2VuZ2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZXNzZW5nZXIgOiBJTWVzc2VuZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seVxyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5PFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4sIExpc3Q8VHVwbGU8b2JqZWN0LCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+Pj4+IF9jYWxscyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgRGljdGlvbmFyeTxUdXBsZTxzdHJpbmcsIFR5cGUsIFR5cGU+LCBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+PigpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNlbmQgTWVzc2FnZSB3aXRoIGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUQXJnc1wiPlRNZXNzYWdlQXJnczwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlbmRlclwiPlNlbmRlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFyZ3NcIj5BcmdzPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZW5kPFRTZW5kZXIsIFRBcmdzPihUU2VuZGVyIHNlbmRlciwgc3RyaW5nIG1lc3NhZ2UsIFRBcmdzIGFyZ3MpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNlbmRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbmRlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5Jbm5lclNlbmQobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCB0eXBlb2YoVEFyZ3MpLCBzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTZW5kIE1lc3NhZ2Ugd2l0aG91dCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZW5kZXJcIj5TZW5kZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZW5kPFRTZW5kZXI+KFRTZW5kZXIgc2VuZGVyLCBzdHJpbmcgbWVzc2FnZSkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc2VuZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VuZGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLklubmVyU2VuZChtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIG51bGwsIHNlbmRlciwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN1YnNjcmliZSBNZXNzYWdlIHdpdGggYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRBcmdzXCI+VEFyZ3M8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCI+QWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzb3VyY2VcIj5zb3VyY2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN1YnNjcmliZTxUU2VuZGVyLCBUQXJncz4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlLCBBY3Rpb248VFNlbmRlciwgVEFyZ3M+IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICBUU2VuZGVyIHNvdXJjZSA9IG51bGwpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzdWJzY3JpYmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjYWxsYmFja1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFjdGlvbjxvYmplY3QsIG9iamVjdD4gd3JhcCA9IChzZW5kZXIsIGFyZ3MpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZW5kID0gKFRTZW5kZXIpc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSA9PSBudWxsIHx8IHNlbmQgPT0gc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKChUU2VuZGVyKXNlbmRlciwgKFRBcmdzKWFyZ3MpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Jbm5lclN1YnNjcmliZShzdWJzY3JpYmVyLCBtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIHR5cGVvZihUQXJncyksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KXdyYXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTdWJzY3JpYmUgTWVzc2FnZSB3aXRob3V0IGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN1YnNjcmliZXJcIj5TdWJzY3JpYmVyPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIj5BY3Rpb248L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNvdXJjZVwiPnNvdXJjZTwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU3Vic2NyaWJlPFRTZW5kZXI+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSwgQWN0aW9uPFRTZW5kZXI+IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICBUU2VuZGVyIHNvdXJjZSA9IG51bGwpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzdWJzY3JpYmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjYWxsYmFja1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFjdGlvbjxvYmplY3QsIG9iamVjdD4gd3JhcCA9IChzZW5kZXIsIGFyZ3MpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZW5kID0gKFRTZW5kZXIpc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSA9PSBudWxsIHx8IHNlbmQgPT0gc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKChUU2VuZGVyKXNlbmRlcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLklubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIsIG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pd3JhcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVuc3Vic2NyaWJlIGFjdGlvbiB3aXRoIGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUQXJnc1wiPlRBcmdzPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVbnN1YnNjcmliZTxUU2VuZGVyLCBUQXJncz4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5uZXJVbnN1YnNjcmliZShtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIHR5cGVvZihUQXJncyksIHN1YnNjcmliZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBVbnN1YnNjcmliZSBhY3Rpb24gd2l0aG91dCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVuc3Vic2NyaWJlPFRTZW5kZXI+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLklubmVyVW5zdWJzY3JpYmUobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCBudWxsLCBzdWJzY3JpYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVtb3ZlIGFsbCBjYWxsYmFja3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0TWVzc2VuZ2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxzLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSW5uZXJTZW5kKHN0cmluZyBtZXNzYWdlLCBUeXBlIHNlbmRlclR5cGUsIFR5cGUgYXJnVHlwZSwgb2JqZWN0IHNlbmRlciwgb2JqZWN0IGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1lc3NhZ2VcIik7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxscy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuX2NhbGxzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zID09IG51bGwgfHwgIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6U3lzdGVtLlR1cGxlPG9iamVjdCwgZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KGFjdGlvbnMpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdGlvbnNDb3B5ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8b2JqZWN0LCBnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+Pj4oYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhY3Rpb24gaW4gYWN0aW9uc0NvcHkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLkNvbnRhaW5zKGFjdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLkl0ZW0yKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbm5lclN1YnNjcmliZShvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIFR5cGUgc2VuZGVyVHlwZSwgVHlwZSBhcmdUeXBlLFxyXG4gICAgICAgICAgICBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gbmV3IFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4obWVzc2FnZSwgc2VuZGVyVHlwZSwgYXJnVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG5ldyBUdXBsZTxvYmplY3QsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+KHN1YnNjcmliZXIsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxzLkNvbnRhaW5zS2V5KGtleSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0uQWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KCksKF9vMSk9PntfbzEuQWRkKHZhbHVlKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHNba2V5XSA9IGxpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbm5lclVuc3Vic2NyaWJlKHN0cmluZyBtZXNzYWdlLCBUeXBlIHNlbmRlclR5cGUsIFR5cGUgYXJnVHlwZSwgb2JqZWN0IHN1YnNjcmliZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInN1YnNjcmliZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwibWVzc2FnZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxscy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvcmVtb3ZlID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5UdXBsZTxvYmplY3QsIGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4+Pih0aGlzLl9jYWxsc1trZXldLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPG9iamVjdCwgZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4sIGJvb2w+KSh0dXBsZSA9PiB0dXBsZS5JdGVtMSA9PSBzdWJzY3JpYmVyKSk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHVwbGUgaW4gdG9yZW1vdmUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsc1trZXldLlJlbW92ZSh0dXBsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6U3lzdGVtLlR1cGxlPG9iamVjdCwgZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KHRoaXMuX2NhbGxzW2tleV0pKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHMuUmVtb3ZlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
