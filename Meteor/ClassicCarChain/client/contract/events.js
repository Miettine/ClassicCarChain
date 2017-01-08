Template.Events.helpers({

    dateTime: function() {
        return "0.0.0 B.C."; 
    },
    oldOwner: function() {
        return Ethereum.m_eventObject().oldOwner;//"0x000000"; 
    },
    newOwner: function() {
        return "0x111111"; 
    }
});
