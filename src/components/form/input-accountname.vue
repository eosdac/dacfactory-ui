<template>
  <div>
    <q-input
      ref="accountname"
      type="text"
      :dark="dark"
      :color="color"
      outlined
      bottom-slots
      :value="value"
      :label="label"
      counter
      maxlength="12"
      :dense="dense"
      @input="handleInput"
      :rules="[ ...rules ]"
    >
      <template v-if="iconLeft" v-slot:prepend>
        <q-icon :name="iconLeft" @click="$emit('clicked_left_icon')"/>
      </template>
      <template v-if="iconRight" v-slot:append>
        <q-icon :name="iconRight" @click="$emit('clicked_right_icon')" class="cursor-pointer" />
      </template>

      <template v-slot:hint>Must be 12 character account name</template>
    </q-input>

  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    value:'',
    color: {
      type: String,
      default: "primary"
    },
    label: {
      type: String,
      default: "Accountname"
    },
    dark: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: String,
      default: ""
    },
    iconRight: {
      type: String,
      default: ""
    },
    rules:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
     
    };
  },
  methods:{
    handleInput(v){
      //todo only emit if validated
      // this.$refs.accountname.validate();
      console.log(this.$refs.accountname);
      this.$emit('input', v);
      
    },
    async isValidAccountName(v){
      const re = /^[a-z1-5.]{1,12}$/;
      if(re.test(v) ){
        return true;
      }
      else{
        return 'accountname bad format.'
      }
    },
    // async isAvailable(v){
    //   if(v.length < 12) return true;
    //   await new Promise(resolve=>{setTimeout(resolve,1000)});
    //   return 'Account already taken.'
    // }
  }
};
</script>

<style>
</style>
