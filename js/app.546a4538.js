(function () {
  "use strict";
  var e = {
      146: function (e, t, i) {
        var n = i(6848),
          r = function () {
            var e = this,
              t = e._self._c;
            return t("div", { attrs: { id: "app" } }, [t("SimonSays")], 1);
          },
          o = [],
          l = function () {
            var e = this,
              t = e._self._c;
            return t("div", { staticClass: "simon-says" }, [
              t("div", { staticClass: "game-board" }, [
                t("div", { staticClass: "simon" }, [
                  t("ul", [
                    t("li", {
                      class: [
                        "red" === e.activeColor ? "tile red active" : "tile",
                        "red",
                      ],
                      attrs: { id: "red" },
                      on: {
                        click: function (t) {
                          return e.playerClick("red");
                        },
                      },
                    }),
                    t("li", {
                      class: [
                        "blue" === e.activeColor ? "tile blue active" : "tile",
                        "blue",
                      ],
                      attrs: { id: "blue" },
                      on: {
                        click: function (t) {
                          return e.playerClick("blue");
                        },
                      },
                    }),
                    t("li", {
                      class: [
                        "yellow" === e.activeColor
                          ? "tile yellow active"
                          : "tile",
                        "yellow",
                      ],
                      attrs: { id: "yellow" },
                      on: {
                        click: function (t) {
                          return e.playerClick("yellow");
                        },
                      },
                    }),
                    t("li", {
                      class: [
                        "green" === e.activeColor
                          ? "tile green active"
                          : "tile",
                        "green",
                      ],
                      attrs: { id: "green" },
                      on: {
                        click: function (t) {
                          return e.playerClick("green");
                        },
                      },
                    }),
                  ]),
                ]),
              ]),
              t("div", { staticClass: "game-info" }, [
                t("h2", [
                  e._v(" Раунд: "),
                  t("span", { attrs: { value: "0" } }, [e._v(e._s(e.round))]),
                ]),
                t("button", { on: { click: e.startGame } }, [e._v("Начать")]),
              ]),
              t("div", { staticClass: "game-options" }, [
                t("h2", [e._v("Сложность игры:")]),
                t("div", [
                  t("label", [e._v("Легко (1.5 сек)")]),
                  t("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.difficulty,
                        expression: "difficulty",
                      },
                    ],
                    attrs: { type: "radio", name: "mode", value: "0" },
                    domProps: { checked: e._q(e.difficulty, "0") },
                    on: {
                      change: function (t) {
                        e.difficulty = "0";
                      },
                    },
                  }),
                ]),
                t("div", [
                  t("label", [e._v("Нормально (1 сек)")]),
                  t("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.difficulty,
                        expression: "difficulty",
                      },
                    ],
                    attrs: { type: "radio", name: "mode", value: "1" },
                    domProps: { checked: e._q(e.difficulty, "1") },
                    on: {
                      change: function (t) {
                        e.difficulty = "1";
                      },
                    },
                  }),
                ]),
                t("div", [
                  t("label", [e._v("Сложно (0.4 сек)")]),
                  t("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.difficulty,
                        expression: "difficulty",
                      },
                    ],
                    attrs: { type: "radio", name: "mode", value: "2" },
                    domProps: { checked: e._q(e.difficulty, "2") },
                    on: {
                      change: function (t) {
                        e.difficulty = "2";
                      },
                    },
                  }),
                ]),
              ]),
              t("audio", { attrs: { id: "red-sound", src: i(991) } }),
              t("audio", { attrs: { id: "blue-sound", src: i(3672) } }),
              t("audio", { attrs: { id: "yellow-sound", src: i(7277) } }),
              t("audio", { attrs: { id: "green-sound", src: i(9654) } }),
            ]);
          },
          s = [],
          a =
            (i(4114),
            {
              name: "SimonSays",
              data() {
                return {
                  colors: ["red", "blue", "yellow", "green"],
                  activeColor: "",
                  sequence: [],
                  playerSequence: [],
                  gameDifficult: [1500, 1e3, 400],
                  round: 1,
                  isPlaying: !1,
                  difficulty: 0,
                };
              },
              methods: {
                lightUp(e) {
                  if (this.isPlaying) {
                    this.activeColor = e;
                    let t = document.getElementById(`${e}-sound`);
                    t.play(),
                      setTimeout(() => {
                        this.unLightUp();
                      }, this.gameDifficult[this.difficulty] - 200);
                  }
                },
                unLightUp() {
                  this.activeColor = "";
                },
                startGame() {
                  (this.isPlaying = !0),
                    (this.sequence = []),
                    (this.playerSequence = []),
                    this.triggerNextMove();
                },
                triggerNextMove() {
                  let e = Math.floor(Math.random() * this.colors.length);
                  this.sequence.push(this.colors[e]),
                    this.unLightUp(),
                    this.lightUpSequence(this.sequence);
                },
                lightUpSequence(e) {
                  let t = 0,
                    i = setInterval(() => {
                      this.lightUp(e[t]),
                        t++,
                        t >= e.length && clearInterval(i);
                    }, this.gameDifficult[this.difficulty]);
                },
                playerClick(e) {
                  this.isPlaying &&
                    (this.playerSequence.push(e),
                    this.lightUp(e),
                    this.playerSequence.length === this.sequence.length &&
                      this.checkSequence());
                },
                checkSequence() {
                  const e = this.playerSequence.every(
                    (e, t) => e === this.sequence[t]
                  );
                  e
                    ? this.playerSequence.length === this.round &&
                      ((this.round += 1),
                      (this.playerSequence = []),
                      setTimeout(() => {
                        this.triggerNextMove();
                      }, 1e3))
                    : ((this.playerSequence = []),
                      (this.isPlaying = !1),
                      (this.sequence = []),
                      (this.round = 1),
                      alert("Вы проиграли!"));
                },
              },
            }),
          c = a,
          u = i(1656),
          d = (0, u.A)(c, l, s, !1, null, null, null),
          f = d.exports,
          h = { name: "App", components: { SimonSays: f } },
          p = h,
          v = (0, u.A)(p, r, o, !1, null, null, null),
          y = v.exports;
        (n.Ay.config.productionTip = !1),
          (n.Ay.config.devtools = !0),
          new n.Ay({ render: (e) => e(y) }).$mount("#app");
      },
      991: function (e, t, i) {
        e.exports = i.p + "media/1.4439a9af.mp3";
      },
      3672: function (e, t, i) {
        e.exports = i.p + "media/2.65e0df3b.mp3";
      },
      7277: function (e, t, i) {
        e.exports = i.p + "media/3.f8db31a2.mp3";
      },
      9654: function (e, t, i) {
        e.exports = i.p + "media/4.049c0e2c.mp3";
      },
    },
    t = {};
  function i(n) {
    var r = t[n];
    if (void 0 !== r) return r.exports;
    var o = (t[n] = { exports: {} });
    return e[n].call(o.exports, o, o.exports, i), o.exports;
  }
  (i.m = e),
    (function () {
      var e = [];
      i.O = function (t, n, r, o) {
        if (!n) {
          var l = 1 / 0;
          for (u = 0; u < e.length; u++) {
            (n = e[u][0]), (r = e[u][1]), (o = e[u][2]);
            for (var s = !0, a = 0; a < n.length; a++)
              (!1 & o || l >= o) &&
              Object.keys(i.O).every(function (e) {
                return i.O[e](n[a]);
              })
                ? n.splice(a--, 1)
                : ((s = !1), o < l && (l = o));
            if (s) {
              e.splice(u--, 1);
              var c = r();
              void 0 !== c && (t = c);
            }
          }
          return t;
        }
        o = o || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > o; u--) e[u] = e[u - 1];
        e[u] = [n, r, o];
      };
    })(),
    (function () {
      i.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e["default"];
              }
            : function () {
                return e;
              };
        return i.d(t, { a: t }), t;
      };
    })(),
    (function () {
      i.d = function (e, t) {
        for (var n in t)
          i.o(t, n) &&
            !i.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      };
    })(),
    (function () {
      i.g = (function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" === typeof window) return window;
        }
      })();
    })(),
    (function () {
      i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      };
    })(),
    (function () {
      i.p = "/";
    })(),
    (function () {
      var e = { 524: 0 };
      i.O.j = function (t) {
        return 0 === e[t];
      };
      var t = function (t, n) {
          var r,
            o,
            l = n[0],
            s = n[1],
            a = n[2],
            c = 0;
          if (
            l.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (r in s) i.o(s, r) && (i.m[r] = s[r]);
            if (a) var u = a(i);
          }
          for (t && t(n); c < l.length; c++)
            (o = l[c]), i.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return i.O(u);
        },
        n = (self["webpackChunksimon_says_vue2"] =
          self["webpackChunksimon_says_vue2"] || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })();
  var n = i.O(void 0, [504], function () {
    return i(146);
  });
  n = i.O(n);
})();
//# sourceMappingURL=app.546a4538.js.map
