<template>
  <section class="dk-table container">
    <el-table
      :data="datasource.data"
      :header-cell-style="rowStyle"
      :height="height"
      :highlight-current-row="_config.single"
      :border="_config.border"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDBClick"
      @cell-mouse-enter="handleRowHover"
      @cell-mouse-leave="handleRowBlur"
      @current-change="handleCurrentChange"
      ref="elTable">
      <el-table-column
        v-if="_config.index"
        :label="_config.indexLabel"
        type="index"
        :index="handlerSerial"
        width="60"
        align="center"/>
      <el-table-column
        v-if="_config.select"
        type="selection"
        :selectable="selectable"
        align="center"/>
      <el-table-column
        v-for="(item,index) in _config.fields"
        :key="index"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        show-overflow-tooltip>
        <template slot-scope="{row}">
          <span :title="item.title ? row[item.title] : ''">{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
      <slot/>
    </el-table>
    <el-pagination
      v-if="_config.pagination"
      @size-change="handleSizeChange"
      @current-change="handlerChange"
      :current-page.sync="page"
      :page-size="_config.size"
      :total="datasource.total"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top:10px;"/>
  </section>
</template>

<script>
/* eslint-disable vue/no-reserved-keys,no-underscore-dangle */
import object from '@/jslibs/object';

export default {
  props: {
    config: {
      type: Object,
      default: () => ({
        pagination: false,
        size: 10,
        index: true,
        select: true,
        single: false,
        border: false,
        fields: [],
      }),
      // 用于校验必传配置
      validator: value => object.isComplete(value, ['fields']),
    },
    datasource: {
      type: Object,
      default: () => ({
        total: 0,
        data: [],
      }),
      required: true,
      // 用于校验必传配置
      validator: value => object.isComplete(value, ['total', 'data']),
    },
    selection: {
      type: Array,
      default: () => ([]),
    },
    height: {
      type: [Number, undefined],
      default: undefined,
    },
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    _config() {
      if (object.isComplete(this.config, ['pagination', 'size', 'fields'])) {
        return this.config
      }
      const config = Object.assign(
        {},
        {
          pagination: true,
          size: 10,
          fields: [{ prop: 'name', label: '名称' }],
        },
        this.config,
      )
      return config
    },
  },
  watch: {
    selection(n) {
      this.$nextTick(() => {
        n.forEach((idx) => {
          this.$refs.elTable.toggleRowSelection(this.datasource.data[idx])
        })
      })
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('change-select', val)
    },
    handlerChange(val) {
      this.page = val;
      this.$emit('change-page', {
        element: this.$refs.pagination,
        page: val,
        size: this._config.size,
      });
    },
    handleSizeChange(val) {
      this._config.size = val
      this.$emit('change-page', {
        element: this.$refs.pagination,
        page: this.page,
        size: val,
      })
    },
    handlerSerial(index) {
      const { size } = this.config;
      const { page } = this;
      return (page - 1) * size + (index + 1);
    },
    handleRowClick(val) {
      this.$emit('row-click', val)
      this.$refs.elTable.toggleRowSelection(val)
    },
    handleRowDBClick(val) {
      this.$emit('row-db-click', val)
    },
    handleRowHover(val) {
      val.hovered = true
    },
    handleRowBlur(val) {
      val.hovered = false
    },
    rowStyle({ rowIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#F5F7FA;font-weight:bold;'
      }
      return ''
    },
    selectable(row) {
      let bool = true
      if (row.isAuthorization && row.isAuthorization !== '1') bool = false
      return bool
    },
    handleCurrentChange(row) {
      this.$emit('change-single', row)
    },
    setSelection(rows) {
      console.log()
      setTimeout(() => {
        rows.forEach((row) => {
          this.$refs.elTable.toggleRowSelection(row)
        })
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .el-table {
    overflow: auto;
    /deep/.el-table__body {
      td {
        border-right: none;
      }
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
