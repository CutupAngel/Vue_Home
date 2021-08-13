<template>
  <span>${{formattedPrice}}</span>
</template>

<script>
export default {
  props: ['price'],
  data() {
    let moneyFormatter = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      minimumFractionDigits: 0
    });
    return {
      moneyFormatter: moneyFormatter
    }
  },
  computed: {
    formattedPrice() {
      return this.moneyFormatter.format(this.price);
    }
  }
}
</script>