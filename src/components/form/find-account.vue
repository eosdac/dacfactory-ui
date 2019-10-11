<template>
  <div class="wrapper">
    <q-select
      ref="searchselect"
      dark
      color="secondary"
      outlined
      v-model="custodianName"
      use-input
      hide-selected
      fill-input
      input-debounce="500"
      label="Lockup Asset"
      :options="fetchedCustodianNames"
      @filter="filterFn"
      hint="See LockUp Asset"
    >
      <template v-slot:no-option>
        <q-item dark>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      custodianName: this.$store.state.factory.stepsData[3].custodianName,
      fetchedCustodianNames: ["kasdactokens", "eosio.token"]
    };
  },

  methods: {
    async fetchAccounts(acc) {
      let res = await this.$eosapi
        .get_table_rows({
          json: true,
          code: "eosio",
          scope: "eosio",
          table: "voters",
          lower_bound: acc.toLowerCase(),
          limit: 8
        })
        .catch(event => {
          console.error(event)
        });
      if (res) {
        return res.rows.map(x => x.owner);
      } else {
        return [];
      }
    },

    async filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }
      let accs = await this.fetchAccounts(val);
      this.fetchedCustodianNames = accs.filter(v => v.startsWith(val));

      update();
    }
  },
  watch: {
    custodianName(value) {
      this.$store.commit("factory/setStepsData", { step: 3, key: 'custodianName', data: { value } });
    }
  }
};
</script>

<style scoped>
  .wrapper {
    margin-bottom: 16px;
  }
</style>
