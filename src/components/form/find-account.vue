<template>
  <div>
      <q-select
      ref="searchselect"
        dark
        color="secondary"
        outlined
        v-model="model_accountname"
        use-input
        hide-selected
        fill-input
        input-debounce="500"
        :options="fetchedAccountNames"
        @filter="filterFn"
        hint="Mininum 2 characters to trigger autocomplete"
        style=""
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
  name: 'findAccountname',
  data () {
    return {
      model_accountname:'',
      fetchedAccountNames: ['kasdactokens', 'eosio.token']
    }
  },

  methods:{
    async fetchAccounts(acc){
      let res = await this.$eosapi.get_table_rows({
        json: true,
        code: "eosio",
        scope: "eosio",
        table: "voters",
        lower_bound: acc.toLowerCase(),
        limit: 8
      }).catch(e => false);
      if(res){
        return res.rows.map(x => x.owner);
      }
      else{
        return [];
      }
      
    },

    async filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return;
      };
      let accs = await this.fetchAccounts(val)
      this.fetchedAccountNames = accs.filter(v => v.startsWith(val));

      update();
    }


  }
}
</script>

<style>
</style>
