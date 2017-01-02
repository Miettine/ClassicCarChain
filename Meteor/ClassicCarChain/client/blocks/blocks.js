Template.Blocks.onCreated(function onCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);


});

Template.Blocks.helpers({
 /* counter() {
    return Template.instance().counter.get();
  },*/
    currentBlock: function() {
        return EthBlocks.latest.number;
    }
});