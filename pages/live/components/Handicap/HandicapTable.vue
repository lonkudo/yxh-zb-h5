<script>
	export default {
		name: 'HandicapTable',
		components: {},
		props: {
			columnLabel: {
				type: Array,
			},
			tableData: {
				type: Array,
			},
		},
		methods: {
			getClass(chuVal, jsVal, type) {
				if (jsVal > chuVal) {
					return 'up'
				} else if (jsVal < chuVal) {
					return 'down'
				}
			},
		},
		render(h) {
			return (
				<div>
					<el-table data={this.tableData} style="width: 100%">
						<el-table-column
							prop="company_name"
							label="Company"
							width="150"
							align="center"
							scopedSlots={{
								default: ({ row, $index }) => {
									return <span>{row.company_name}</span>
								},
							}}
						></el-table-column>
						<el-table-column label="Initial" align="center">
							<el-table-column
								label={this.columnLabel[0]}
								scopedSlots={{
									default: ({ row, $index }) => {
										return <span>{row.chupan[2]}</span>
									},
								}}
								align="center"
							></el-table-column>
							<el-table-column
								label={this.columnLabel[1]}
								scopedSlots={{
									default: ({ row, $index }) => {
										return <span>{row.chupan[3]}</span>
									},
								}}
								align="center"
							></el-table-column>
							<el-table-column
								label={this.columnLabel[2]}
								scopedSlots={{
									default: ({ row, $index }) => {
										return <span>{row.chupan[4]}</span>
									},
								}}
								align="center"
							></el-table-column>
						</el-table-column>
						<el-table-column label="Instant" align="center">
							<el-table-column
								label={this.columnLabel[0]}
								scopedSlots={{
									default: ({ row, $index }) => {
										return (
											<span class={this.getClass(row.chupan[2], row.jishi[2])}>
												{row.jishi[2]}
											</span>
										)
									},
								}}
								align="center"
							></el-table-column>
							<el-table-column
								label={this.columnLabel[1]}
								align="center"
								scopedSlots={{
									default: ({ row, $index }) => {
										return (
											<span class={this.getClass(row.chupan[3], row.jishi[3])}>
												{row.jishi[3]}
											</span>
										)
									},
								}}
							></el-table-column>
							<el-table-column
								label={this.columnLabel[2]}
								align="center"
								scopedSlots={{
									default: ({ row, $index }) => {
										return (
											<span class={this.getClass(row.chupan[4], row.jishi[4])}>
												{row.jishi[4]}
											</span>
										)
									},
								}}
							></el-table-column>
						</el-table-column>
					</el-table>
				</div>
			)
		},
	}
</script>
<style scoped lang="scss">
	@import '~@/static/styles/css/mixin.scss';
	@include updown;
</style>
