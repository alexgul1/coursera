/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  return {
    units: ['years', 'months', 'days', 'hours', 'minutes'],
    _value: new Date(Date.parse(date)),
    value: date,

    getTime: function () {
      var yy = this._value.getFullYear();

      var mm = this._value.getMonth() + 1;
      if(mm < 10) {
        mm = '0' + mm;
      }

      var dd = this._value.getDate();
      if(dd < 10) {
        dd = '0' + dd;
      }

      var hh = this._value.getHours();
      if(hh < 10) {
        hh = '0' + hh;
      }

      var mi = this._value.getMinutes();
      if(mi < 10) {
        mi = '0' + mi;
      }

      return `${yy}-${mm}-${dd} ${hh}:${mi}`
    },



    add: function (increment, unit) {

        if(isNaN(increment) || increment < 0 || !this.units.includes(unit)) {
          throw TypeError('wrong value passed')
        }

        switch (unit) {
          case 'years' : {
            this._value.setFullYear(this._value.getFullYear() + increment);
            break;
          }
          case 'months' : {
            this._value.setMonth(this._value.getMonth() + increment);
            break;
          }
          case 'days' : {
            this._value.setDate(this._value.getDate() + increment);
            break;
          }
          case 'hours' : {
            this._value.setHours(this._value.getHours() + increment);
            break;
          }
          case 'minutes' : {
            this._value.setMinutes(this._value.getMinutes() + increment);
            break
          }
        }
        this.value = this.getTime()
        return this;

    },
    subtract: function (decrement, unit) {

        if(isNaN(decrement) || decrement < 0 || !this.units.includes(unit)) {
          throw new TypeError('wrong value passed')
        }

        switch (unit) {
          case 'years' : {
            this._value.setFullYear(this._value.getFullYear() - decrement);
            break;
          }
          case 'months' : {
            this._value.setMonth(this._value.getMonth() - decrement);
            break;
          }
          case 'days' : {
            this._value.setDate(this._value.getDate() - decrement);
            break;
          }
          case 'hours' : {
            this._value.setHours(this._value.getHours() - decrement);
            break;
          }
          case 'minutes' : {
            this._value.setMinutes(this._value.getMinutes() - decrement);
            break
          }
        }
        this.value = this.getTime()
        return this;
    }
  }
};
