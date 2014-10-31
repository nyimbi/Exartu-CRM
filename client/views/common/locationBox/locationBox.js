var oldValue;
EditLocationMode = {
  val: false,
  dep: new Deps.Dependency,
  show: function () {
    this.val = true;
    oldValue = location.value;
    this.dep.changed();
  },
  hide: function () {
    this.val = false;
    this.dep.changed();
  }
};
Object.defineProperty(EditLocationMode, "value", {
  get: function () {
    this.dep.depend();
    return this.val;
  },
  set: function (newValue) {
    this.val = newValue;
    this.dep.changed();
  }
});

LocationSchema = new SimpleSchema({
  address: {
    type: String,
    label: 'Address line 1',
    optional: true
  },
  address2: {
    type: String,
    label: 'Address line 2',
    optional: true
  },
  city: {
    type: String,
    label: 'City',
    optional: true
  },
  state: {
    type: String,
    label: 'State',
    optional: true
  },
  country: {
    type: String,
    label: 'Country',
    optional: true
  },
  postalCode: {
    type: Number,
    label: 'Zip code',
    optional: true
  }
});

var location = {};
Utils.reactiveProp(location, 'value', null);

Template.locationBox.helpers({
  created: function () {
    var self = this;
    location.value = self.data.location;

    AutoForm.hooks({
      SetLocation: {
        onSubmit: function(newAddress) {
          self.data.callback && self.data.callback(newAddress);

          location.value = newAddress;
          EditLocationMode.hide();

          this.done();
          this.resetForm();
          return false;
        }
      }
    });
  },
  location: function() {
    return location;
  },
  editMode: function () {
    return EditLocationMode.value;
  },
  editModeColor: function () {
    return EditLocationMode.value ? '#008DFC' : '';
  }
});

Template.locationBox.events = {
  'click #edit-Location': function (e, ctx) {
    if (EditLocationMode.value) {
      EditLocationMode.hide();
    }
    else {
      EditLocationMode.show();
      ctx.$('input').focus();
    }
  },
  'click #save-location': function () {
    //Contactables.update({ _id: this._id }, { $set: { location: location.value } });
    //EditLocationMode.value = false;
  },
  'click #cancel-location': function () {
    location.value = oldValue;
    EditLocationMode.value = false;
  }
};