<template>
  <v-app>
    <v-app-bar app elevation="20">
      <v-btn
        color="error"
        dark
        text
        :disabled="selected.length === 0"
        @click="onClickBtnDelete"
      >
        <v-icon dark> mdi-delete </v-icon>
      </v-btn>

      <v-spacer />

      <v-avatar color="primary">
        <v-img
          :src="require('@/assets/cassandra_logo.png')"
          alt="Cassandra Logo"
          height="50"
          width="50"
          contain
        />
      </v-avatar>

      <v-spacer />

      <v-btn color="success" dark text @click="isDialogVisible = true">
        <v-icon dark> mdi-plus-circle </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-card>
        <v-card-title class="d-flex flex-column">
          Tabela Pessoa

          <v-text-field
            v-model="filter"
            append-icon="mdi-magnify"
            label="Procurar por ID, nome ou email"
            single-line
            hide-details
            style="width: 100%"
          />
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="list"
          :loading="loading"
          :search="filter"
          @click:row="clickRow"
          show-select
        />
      </v-card>
    </v-main>

    <v-dialog v-model="isDialogVisible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Pessoa</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="form.valid">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.name"
                    label="Nome"
                    :rules="[rules.name]"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    label="Seu email"
                    :rules="[rules.email]"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="error" text @click="onCloseDialog">
            <v-icon dark> mdi-close </v-icon>
          </v-btn>

          <v-spacer />

          <v-btn color="success" text @click="onSubmitDialog">
            <v-icon dark> mdi-check </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="2000" color="warning">
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
const BASE_URL = "http://localhost:4000/person";

export default {
  name: "App",

  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Nome", value: "name" },
      { text: "Email", value: "email" },
    ],
    list: [],
    filter: "",
    loading: true,
    selected: [],
    isDialogVisible: false,
    form: {
      name: "",
      email: "",
      valid: false,
    },
    rules: {
      name: (val) => (val || "").length > 0 || "Campo obrigatório!",
      email: (val) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(val) || "Email inválido!";
      },
    },
    snackbar: false,
    msg: "",
    type: "",
  }),

  methods: {
    async fetch() {
      this.loading = true;

      await this.$http
        .get(BASE_URL)
        .then((res) => {
          this.list = res.data;
        })
        .catch(() => {
          this.msg = "Algo deu errado ao tentar carregar os dados...";
          this.snackbar = true;
        });

      this.loading = false;
    },

    async postItem(item) {
      this.loading = true;
      await this.$http.post(BASE_URL, item).then(() => {
        this.onCloseDialog();
        this.fetch();
      });

      this.msg = "Registro criado com sucesso!";
      this.snackbar = true;
    },

    async putItem(id, item) {
      this.loading = true;
      await this.$http.put(BASE_URL + `/${id}`, item).then(() => {
        this.onCloseDialog();
        this.fetch();
      });

      this.msg = "Registro atualizado com sucesso!";
      this.snackbar = true;
    },

    async deleteItem(id) {
      await this.$http.delete(BASE_URL + `/${id}`);
    },

    async onClickBtnDelete() {
      this.loading = true;

      for (let i = 0; i < this.selected.length; i++) {
        await this.deleteItem(this.selected[i].id);
      }

      this.selected = [];
      this.msg = "Registro(s) selecionado(s) excluído(s) com sucesso!";
      this.snackbar = true;

      await this.fetch();
    },

    onCloseDialog() {
      this.isDialogVisible = false;
      this.resetForm();
    },

    async onSubmitDialog() {
      if (this.form.valid) {
        this.loading = true;

        delete this.form.valid;
        if (this.form.id) await this.putItem(this.form.id, this.form);
        else await this.postItem(this.form);
      } else this.$refs.form.validate();
    },

    resetForm() {
      this.form = {
        name: "",
        email: "",
        valid: false,
      };
      this.$refs.form.reset();
    },

    async clickRow(item) {
      await Object.assign(this.form, item);
      this.isDialogVisible = true;
    },
  },

  async created() {
    await this.fetch();
  },
};
</script>
