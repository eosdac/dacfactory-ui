<template>
  <div class="overflow-hidden">
    <q-input
      autocomplete="off"
      ref="my_input"
      :dark="dark"
      :color="color"
      :type="type"
      outlined
      noErrorIcon
      bottom-slots
      :value="value"
      :label="label"
      :counter="false"
      :maxlength="maxlength"
      :dense="dense"
      @input="handleInput"
      @blur="onBlur"
      :rules="[...rules]"
      :debounce="debounce"
      :hide-hint="false"
      :items-aligned="false"
      :mask="mask"
      class="q-mb-md overflow-hidden"
    >
      <template v-slot:append v-if="isMounted">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" mode="out-in">
          <q-icon
            v-if="
              !!$refs.my_input &&
                $refs.my_input.isDirty &&
                !$refs.my_input.hasError &&
                validationSuccess &&
                isShowAppend
            "
            name="check"
            color="positive"
            key="ok"
          />
          <q-icon
            v-else-if="!!$refs.my_input && $refs.my_input.hasError && validationError && isShowAppend"
            name="close"
            color="negative"
            key="error"
          />
        </transition>
      </template>
      <template v-slot:hint>
        {{ hint }}
      </template>
      <template v-slot:counter>
        <div v-if="rightSideHint">{{ rightSideHint }}</div>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: "",
    color: {
      type: String,
      default: "primary"
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: "Accountname"
    },
    dark: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: null
    },
    rightSideHint: {
      type: String,
      default: null
    },
    dense: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: String,
      default: ""
    },
    rules: {
      type: Array,
      default: () => []
    },
    mask: {
      type: String,
      default: ""
    },
    validateOnMounted: {
      type: Boolean,
      default: true
    },
    debounce: {
      type: Number,
      default: 400
    },
    isSetFocus: {
      type: Boolean,
      default: false
    },
    isNotRequired: {
      type: Boolean,
      default: false
    },
    isShowAppend: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMounted: false
    };
  },
  mounted() {
    if (this.value && this.validateOnMounted) {
      this.$refs.my_input.validate();
    }
    this.isMounted = true;
  },
  computed: {
    validationSuccess() {
      this.$emit("statusChange", { value: this.value, error: false });
      return true;
    },
    validationError() {
      this.$emit("statusChange", { value: this.value, error: true });
      return true;
    }
  },
  methods: {
    handleInput(v) {
      //todo only emit if validated
      // this.$refs.my_input.validate();
      this.$emit("input", v);
    },
    onBlur() {
      if (!this.value) {
        setTimeout(() => {
          if (this.$refs.my_input) {
            this.$refs.my_input.resetValidation();
          }
        }, 2000);
      }
    }
  },
  watch: {
    isSetFocus(value) {
      if (value) {
        this.$refs.my_input.focus();
      }
    }
  }
};
</script>
