<template>
  <div class="overflow-hidden">
    <q-input
      autocomplete="off"
      ref="my_input"
      type="text"
      :dark="dark"
      :color="color"
      outlined
      noErrorIcon
      bottom-slots
      :value="value"
      :label="label"
      counter
      maxlength="12"
      :dense="dense"
      @input="handleInput"
      @blur="onBlur"
      :rules="[ ...rules ]"
      :debounce="200"
      :hide-hint="false"
      :items-aligned="false"
      :mask="mask"

      class="q-mb-lg"

    >
      <template v-if="iconLeft" v-slot:prepend>
        <q-icon :name="iconLeft" @click="$emit('clicked_left_icon')"/>
      </template>
      <template  v-slot:append>
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" mode="out-in">
          <q-icon v-if="!!$refs.my_input && $refs.my_input.isDirty && !$refs.my_input.hasError && validationSuccess()" name="check" color="positive" key="ok" />
          <q-icon v-else-if="!!$refs.my_input && $refs.my_input.hasError && validationError()" name="close" color="negative" key="error"/>
        </transition>
      </template>

      <template v-slot:hint><div v-if="showhint">Must be 12 character account name</div></template>


    </q-input>

  </div>
</template>

<script>
export default {
inheritAttrs: false,
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
    },
    mask:{
      type: String,
      default:''
    },
    validateOnMounted:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
     showhint:true
    };
  },
  methods:{
    handleInput(v){
      //todo only emit if validated
      // this.$refs.my_input.validate();
      console.log(this.$refs.my_input);
      this.$emit('input', v);
      
    },

    validationSuccess(){
      this.showhint=false;
      this.$emit('statusChange', {value: this.value, error: false});
      return true;
    },
  
    validationError(){
      this.showhint=true;
      this.$emit('statusChange', {value: this.value, error: true});
      return true;
    },

    onBlur(){
      if(this.value == '' ){
        setTimeout(()=>{
          this.$refs.my_input.resetValidation()
        },200)
      }
    }

  },
  mounted(){
    if(this.value !='' && this.validateOnMounted){
      this.$refs.my_input.validate();
    }
    
  }

};
</script>

<style>
</style>
