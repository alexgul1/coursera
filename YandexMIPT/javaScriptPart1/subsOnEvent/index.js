module.exports = {

    subscribers: [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.subscribers.push(
            {
                event,
                subscriber,
                handler
            }
        )
        return this
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        var _index = -1;
            this.subscribers.findIndex((element, index) => {
            if(element.event === event && element.subscriber === subscriber) {
                _index = index;
                return;
            }
        })
        if(_index === -1) {
            return this
        }
        this.subscribers.splice(_index, 1);
        return this.off(event,subscriber);
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for (let i = 0; i < this.subscribers.length; i++) {
            let subscriber = this.subscribers[i];
            if (subscriber.event === event && subscriber.subscriber && subscriber.handler) {
                subscriber.handler.call(subscriber.subscriber);
            }
        }
        return this;
    }
};
